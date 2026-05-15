"use client";

import { useCallback, useEffect, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { trackLead } from "@/lib/track";
import { TurnstileWidget } from "./turnstile-widget";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("subiect") ?? params.get("subject");
    if (prefill) setSubject(prefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
          website,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "A apărut o eroare. Încearcă din nou.");
      }
      setStatus("success");
      trackLead("contact_form");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
          <CheckCircle2 size={26} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Mesajul a fost trimis
        </h3>
        <p className="text-slate-600 mb-6 max-w-sm">
          Mulțumim! Un membru al echipei XBeauty îți va răspunde în maxim 24
          ore lucrătoare.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-pink-600 hover:text-pink-500"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white disabled:opacity-60 disabled:cursor-not-allowed";
  const labelClass =
    "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";
  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] top-[-9999px]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className={labelClass}>Prenume</span>
          <input
            type="text"
            required
            disabled={submitting}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Nume</span>
          <input
            type="text"
            required
            disabled={submitting}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            required
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Telefon (opțional)</span>
          <input
            type="tel"
            disabled={submitting}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            placeholder="07XX XXX XXX"
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Subiect</span>
        <input
          type="text"
          disabled={submitting}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={fieldClass}
          placeholder="Ex: Informații despre X-Mix"
        />
      </label>

      <label className="block">
        <span className={labelClass}>Mesaj</span>
        <textarea
          rows={6}
          required
          minLength={10}
          disabled={submitting}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="Spune-ne cu ce te putem ajuta..."
        />
      </label>

      <TurnstileWidget onToken={onTurnstileToken} />

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Se trimite...
          </>
        ) : (
          <>
            <Send size={16} />
            Trimite mesajul
          </>
        )}
      </button>
    </form>
  );
}
