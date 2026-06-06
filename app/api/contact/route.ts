import { NextResponse } from "next/server";
import { isContactServiceOption } from "@/data/services";
import { sendContactEmail } from "@/lib/contact-email";

const MAX_MESSAGE = 8000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const honeypot = typeof o.website === "string" ? o.website.trim() : "";
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof o.email === "string" ? o.email.trim() : "";
  const serviceInterest = typeof o.serviceInterest === "string" ? o.serviceInterest.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!email || !serviceInterest) {
    return NextResponse.json({ error: "Email and service interest are required." }, { status: 400 });
  }
  if (!isContactServiceOption(serviceInterest)) {
    return NextResponse.json({ error: "Please choose a valid service." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const result = await sendContactEmail({ email, serviceInterest, message });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Could not send right now. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
