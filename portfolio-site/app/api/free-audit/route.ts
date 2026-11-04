import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const recipient = "jamesmanuel966@gmail.com";
const allowedServices = new Set(["GMC", "GMB", "GA4", "GTM"]);
const recentRequests = new Map<string, number[]>();

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] ?? char);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !!url.hostname;
  } catch {
    return false;
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (recentRequests.get(key) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 4) {
    recentRequests.set(key, recent);
    return true;
  }
  recent.push(now);
  recentRequests.set(key, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expectedOrigin = request.nextUrl.origin;
  if (origin && origin !== expectedOrigin) {
    return NextResponse.json({ error: "Request could not be verified." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Your request is too large." }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  // Quietly accept bots that fill the hidden honeypot without sending an email.
  if (clean(body.company, 120)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const website = clean(body.website, 2048);
  const service = clean(body.service, 10);
  const issue = clean(body.issue, 3000);

  if (name.length < 2 || !isValidEmail(email) || !isValidWebsite(website) ||
      !allowedServices.has(service) || issue.length < 10 || clean(body.consent, 10) === "false") {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: "Please accept the Privacy Policy to continue." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUDIT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Free audit email is not configured: RESEND_API_KEY or AUDIT_FROM_EMAIL is missing.");
    return NextResponse.json({ error: "The request form is temporarily unavailable. Please email me directly at jamesmanuel966@gmail.com." }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeWebsite = escapeHtml(website);
  const safeService = escapeHtml(service);
  const safeIssue = escapeHtml(issue).replace(/\r?\n/g, "<br />");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `New free ${service} health-check request — ${name}`,
        html: `
          <h2>New free health-check request</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Website:</strong> <a href="${safeWebsite}">${safeWebsite}</a></p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Issue:</strong><br />${safeIssue}</p>
        `,
        text: `New free health-check request\nName: ${name}\nEmail: ${email}\nWebsite: ${website}\nService: ${service}\nIssue: ${issue}`,
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Resend rejected free audit email:", response.status, providerError.slice(0, 500));
      return NextResponse.json({ error: "We couldn't send your request right now. Please try again or email me directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Free audit email delivery failed:", error);
    return NextResponse.json({ error: "We couldn't send your request right now. Please try again or email me directly." }, { status: 502 });
  }
}
