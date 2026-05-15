import { NextResponse } from "next/server";
import { sendEmail, escapeHtml } from "@/lib/email";
import { isEmail, isRoPhone, normalizeRoPhone, trimOr } from "@/lib/validation";
import { SITE_URL } from "@/lib/site-url";
import { getClientIp, rateLimit, verifyTurnstile } from "@/lib/security";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);

  const limit = rateLimit(`quote:${ip}`, { limit: 5, windowMs: 60 * 60_000 });
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

  const name = trimOr(payload.name, 120);
  const email = trimOr(payload.email, 200);
  const rawPhone = trimOr(payload.phone, 40) ?? "";
  const phone = rawPhone ? (normalizeRoPhone(rawPhone) ?? "") : "";
  const company = trimOr(payload.company, 200) ?? "";
  const message = trimOr(payload.message, 3000) ?? "";
  const productName = trimOr(payload.productName, 200) ?? "";
  const productSlug = trimOr(payload.productSlug, 200) ?? "";
  const productSku = trimOr(payload.productSku, 100) ?? "";

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Completează numele." },
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

  const productUrl = productSlug
    ? `${SITE_URL}/echipamente/${productSlug}`
    : "";

  const html = `
    <h2>Solicitare de ofertă</h2>
    ${
      productName
        ? `<div style="background:#fdf2f8;border:1px solid #fce7f3;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-family:system-ui,sans-serif">
             <div style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#be185d;font-weight:700;margin-bottom:4px">Produs</div>
             <div style="font-size:16px;font-weight:700;color:#0f172a">${escapeHtml(productName)}</div>
             ${productSku ? `<div style="font-size:12px;color:#64748b;margin-top:4px">SKU: ${escapeHtml(productSku)}</div>` : ""}
             ${productUrl ? `<div style="margin-top:8px"><a href="${productUrl}" style="color:#ec4899">${productUrl}</a></div>` : ""}
           </div>`
        : ""
    }
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif">
      <tr><td style="padding:4px 12px;color:#64748b">Contact</td><td style="padding:4px 12px"><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px;color:#64748b">Email</td><td style="padding:4px 12px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 12px;color:#64748b">Telefon</td><td style="padding:4px 12px">${escapeHtml(phone)}</td></tr>` : ""}
      ${company ? `<tr><td style="padding:4px 12px;color:#64748b">Clinică / companie</td><td style="padding:4px 12px">${escapeHtml(company)}</td></tr>` : ""}
    </table>
    ${
      message
        ? `<hr style="margin:16px 0;border:0;border-top:1px solid #e2e8f0"/>
           <div style="white-space:pre-wrap;font-family:system-ui,sans-serif;color:#0f172a">${escapeHtml(message)}</div>`
        : ""
    }
  `;

  const text = [
    productName ? `Produs: ${productName}${productSku ? ` (${productSku})` : ""}` : null,
    productUrl ? `Link: ${productUrl}` : null,
    "",
    `Contact: ${name}`,
    `Email: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    company ? `Companie: ${company}` : null,
    message ? `\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const subject = productName
    ? `[Ofertă] ${productName}`
    : "[Ofertă] Solicitare de pe xbeauty.ro";

  const result = await sendEmail({ subject, html, text, replyTo: email });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
