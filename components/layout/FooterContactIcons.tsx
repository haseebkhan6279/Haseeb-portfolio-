import { CONTACT } from "@/data/site";

const phoneHref = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

export default function FooterContactIcons() {
  return (
    <div className="footer-contact-icons" role="list" aria-label="Contact channels">
      <a
        role="listitem"
        href={`mailto:${CONTACT.email}`}
        className="footer-contact-icons__btn footer-contact-icons__btn--gmail"
        aria-label={`Email ${CONTACT.email}`}
        title={CONTACT.email}
      >
        <GmailIcon />
      </a>
      <a
        role="listitem"
        href={CONTACT.github}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-contact-icons__btn footer-contact-icons__btn--github"
        aria-label="GitHub profile"
        title="GitHub — haseebkhan6279"
      >
        <GitHubIcon />
      </a>
      <a
        role="listitem"
        href={CONTACT.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-contact-icons__btn footer-contact-icons__btn--linkedin"
        aria-label="LinkedIn profile"
        title="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        role="listitem"
        href={phoneHref}
        className="footer-contact-icons__btn footer-contact-icons__btn--phone"
        aria-label={`Call ${CONTACT.phone}`}
        title={CONTACT.phone}
      >
        <PhoneIcon />
      </a>
    </div>
  );
}

function GmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M5.2 4h13.6A1.2 1.2 0 0120 5.2v2.1L12 11.5 4 7.3V5.2A1.2 1.2 0 015.2 4z" />
      <path fill="#FBBC05" d="M4 7.3l8 4.2 8-4.2v11.5A1.2 1.2 0 0118.8 20H5.2A1.2 1.2 0 014 18.8V7.3z" />
      <path fill="#34A853" d="M4 7.3l8 4.2V20H5.2A1.2 1.2 0 014 18.8V7.3z" />
      <path fill="#4285F4" d="M20 7.3v11.5A1.2 1.2 0 0118.8 20H12v-8.5l8-4.2z" />
      <path fill="#C5221F" d="M12 11.5L4 7.3V5.2A1.2 1.2 0 015.2 4h6.8v7.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.254-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.425 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.783 13.019H3.555V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path
        d="M6.5 4h2l1.5 4.5-2 1.2a11 11 0 005.8 5.8l1.2-2L21 14.5V17a2 2 0 01-2 2A15 15 0 014 6.5a2 2 0 012-2.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
