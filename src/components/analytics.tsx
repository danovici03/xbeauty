"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "xbeauty-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === "accepted") {
        setConsented(true);
      }
    } catch {}

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ value: string }>).detail;
      setConsented(detail?.value === "accepted");
    };
    window.addEventListener("cookie-consent", handler);
    return () => window.removeEventListener("cookie-consent", handler);
  }, []);

  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!consented) return null;

  return (
    <>
      {ga4 ? (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga4}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {pixel ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
