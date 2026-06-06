import { CONTACT } from "@/data/site";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export type ContactSubmission = {
  email: string;
  serviceInterest: string;
  message: string;
};

type SendResult = { ok: true } | { ok: false; status: number; reason?: string };

function getRecipientEmail() {
  return process.env.CONTACT_TO_EMAIL ?? CONTACT.email;
}

function buildEmailContent({ email, serviceInterest, message }: ContactSubmission) {
  const subject = `Portfolio inquiry — ${serviceInterest}`;
  const details = message || "(No additional message)";

  const text = [
    "New message from your portfolio contact form",
    "",
    `Service interest: ${serviceInterest}`,
    `Sender email: ${email}`,
    "",
    "Project details:",
    details,
    "",
    `Reply directly to: ${email}`,
  ].join("\n");

  const html = `
    <h2>New portfolio inquiry</h2>
    <p><strong>Service interest:</strong> ${escapeHtml(serviceInterest)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <h3>Project details</h3>
    <p style="white-space:pre-wrap">${escapeHtml(details)}</p>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(
  submission: ContactSubmission,
  content: ReturnType<typeof buildEmailContent>,
): Promise<SendResult | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  const to = getRecipientEmail();
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: submission.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  if (error) {
    console.error("[contact] Resend error", { to, from, error });
    return {
      ok: false,
      status: 502,
      reason: error.message ?? "Resend rejected the send request.",
    };
  }

  console.info("[contact] Resend sent", { id: data?.id, to, from });
  return { ok: true };
}

async function sendViaSmtp(
  submission: ContactSubmission,
  content: ReturnType<typeof buildEmailContent>,
): Promise<SendResult | null> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";
  const to = getRecipientEmail();
  const from = process.env.SMTP_FROM ?? user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: submission.email,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[contact] SMTP error", error);
    return { ok: false, status: 502 };
  }
}

export async function sendContactEmail(submission: ContactSubmission): Promise<SendResult> {
  const content = buildEmailContent(submission);

  const resendResult = await sendViaResend(submission, content);
  if (resendResult) return resendResult;

  const smtpResult = await sendViaSmtp(submission, content);
  if (smtpResult) return smtpResult;

  console.warn(
    "[contact] no email provider configured — set RESEND_API_KEY or SMTP_* on the server",
    {
      to: getRecipientEmail(),
      serviceInterest: submission.serviceInterest,
      senderEmail: submission.email,
    },
  );

  return {
    ok: false,
    status: 503,
    reason: "Email delivery is not configured on the server.",
  };
}
