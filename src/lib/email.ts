import "server-only";
import { Resend } from "resend";

type SendArgs = {
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail({
  subject,
  html,
  text,
  replyTo,
}: SendArgs): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "no-reply@xbeauty.ro";
  const to = process.env.CONTACT_TO_EMAIL || "marketing@xbeauty.ro";

  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY missing — logging payload instead of sending.",
    );
    console.log("[email] ---");
    console.log("[email] To:", to);
    console.log("[email] Subject:", subject);
    console.log("[email] Reply-To:", replyTo);
    console.log("[email] Body:", text ?? html);
    console.log("[email] ---");
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `XBeauty <${from}>`,
      to,
      subject,
      html,
      text,
      replyTo,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message ?? "Email failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Exception:", err);
    return { ok: false, error: "Email failed" };
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
