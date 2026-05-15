import { NextResponse } from "next/server";
import { sendEmail, escapeHtml } from "@/lib/email";
import { isEmail, isRoPhone, normalizeRoPhone, trimOr } from "@/lib/validation";
import { getClientIp, rateLimit, verifyTurnstile } from "@/lib/security";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);

  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Prea multe încercări. Reîncearcă peste câteva minute.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON invalid" },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown>;

  // Honeypot: botul completeaza acest camp ascuns.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const turnstileToken = trimOr(payload.turnstileToken, 4000) ?? undefined;
  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Verificare anti-spam eșuată. Reîncearcă." },
      { status: 400 },
    );
  }

  const firstName = trimOr(payload.firstName, 80);
  const lastName = trimOr(payload.lastName, 80);
  const email = trimOr(payload.email, 200);
  const rawPhone = trimOr(payload.phone, 40) ?? "";
  const phone = rawPhone ? (normalizeRoPhone(rawPhone) ?? "") : "";
  const subject = trimOr(payload.subject, 200) ?? "Contact de pe xbeauty.ro";
  const message = trimOr(payload.message, 3000);

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Completează numele și prenumele." },
      { status: 400 },
    );
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Email invalid." },
      { status: 400 },
    );
  }
  if (rawPhone && !isRoPhone(rawPhone)) {
    return NextResponse.json(
      { ok: false, error: "Telefon invalid. Format: 07XX XXX XXX." },
      { status: 400 },
    );
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Mesajul e prea scurt (min. 10 caractere)." },
      { status: 400 },
    );
  }

  const html = `
    <h2>Mesaj nou de pe xbeauty.ro</h2>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif">
      <tr><td style="padding:4px 12px;color:#64748b">Nume</td><td style="padding:4px 12px"><strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong></td></tr>
      <tr><td style="padding:4px 12px;color:#64748b">Email</td><td style="padding:4px 12px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 12px;color:#64748b">Telefon</td><td style="padding:4px 12px">${escapeHtml(phone)}</td></tr>` : ""}
      <tr><td style="padding:4px 12px;color:#64748b">Subiect</td><td style="padding:4px 12px">${escapeHtml(subject)}</td></tr>
    </table>
    <hr style="margin:16px 0;border:0;border-top:1px solid #e2e8f0"/>
    <div style="white-space:pre-wrap;font-family:system-ui,sans-serif;color:#0f172a">${escapeHtml(message)}</div>
  `;

  const text = [
    `Nume: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    `Subiect: ${subject}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await sendEmail({
    subject: `[Contact] ${subject}`,
    html,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
