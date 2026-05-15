"use client";

import { useCallback, useEffect, useState } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { trackLead } from "@/lib/track";
import { TurnstileWidget } from "./turnstile-widget";

type Props = {
  productName: string;
  productSlug: string;
  productSku?: string;
  triggerClassName?: string;
  triggerLabel?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function RequestQuoteModal({
  productName,
  productSlug,
  productSku,
  triggerClassName,
  triggerLabel = "Solicită Ofertă",
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const onTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    setTurnstileToken("");
    setStatus("idle");
    setError("");
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          message,
          productName,
          productSlug,
          productSku,
          website,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "A apărut o eroare.");
      }
      setStatus("success");
      trackLead("quote_modal");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white disabled:opacity-60";
  const labelClass =
    "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName ??
          "flex-1 bg-pink-600 hover:bg-pink-500 text-white px-6 py-4 rounded-full font-semibold text-center transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
        }
      >
        <Mail size={18} /> {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={close}
          />
          <div
            role="dialog"
            aria-labelledby="quote-title"
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl my-4 md:my-0"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Închide"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <div className="p-8 md:p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Mulțumim!
                </h3>
                <p className="text-slate-600 mb-6">
                  Cererea ta pentru{" "}
                  <span className="font-semibold text-slate-900">
                    {productName}
                  </span>{" "}
                  a fost trimisă. Îți răspundem în maxim 24 ore lucrătoare.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  Închide
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 md:p-8">
                <h3 id="quote-title" className="text-xl font-bold text-slate-900">
                  Solicită ofertă
                </h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  Cerere pentru{" "}
                  <span className="text-slate-900 font-semibold">
                    {productName}
                  </span>
                </p>

                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute left-[-9999px]"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  <label className="block">
                    <span className={labelClass}>Nume complet</span>
                    <input
                      type="text"
                      required
                      disabled={status === "submitting"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass}
                    />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className={labelClass}>Email</span>
                      <input
                        type="email"
                        required
                        disabled={status === "submitting"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Telefon</span>
                      <input
                        type="tel"
                        disabled={status === "submitting"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldClass}
                        placeholder="07XX XXX XXX"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className={labelClass}>Clinică / salon</span>
                    <input
                      type="text"
                      disabled={status === "submitting"}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={fieldClass}
                      placeholder="Opțional"
                    />
                  </label>

                  <label className="block">
                    <span className={labelClass}>Mesaj (opțional)</span>
                    <textarea
                      rows={3}
                      disabled={status === "submitting"}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${fieldClass} resize-y`}
                      placeholder="Spune-ne despre clinica ta, volumul estimat, când vrei să demarezi..."
                    />
                  </label>
                </div>

                <div className="mt-4">
                  <TurnstileWidget onToken={onTurnstileToken} />
                </div>

                {status === "error" && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={close}
                    disabled={status === "submitting"}
                    className="flex-1 px-5 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-slate-300"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400 text-white font-semibold shadow-lg shadow-pink-600/25"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Trimite cererea
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-4 text-center">
                  Prin trimitere ești de acord cu{" "}
                  <a href="/confidentialitate" className="underline">
                    Politica de confidențialitate
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
