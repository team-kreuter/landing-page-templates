"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "@/lib/cookies";
import trackingData from "@/data/tracking.json";

type ConsentType = { marketing: boolean; analytics: boolean } | null;

export function TrackingScripts() {
  const [consent, setConsentState] = useState<ConsentType>(null);
  const config = trackingData;

  useEffect(() => {
    const stored = getConsent();
    if (stored) {
      setConsentState({ marketing: stored.marketing, analytics: stored.analytics });
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setConsentState({ marketing: detail.marketing, analytics: detail.analytics });
      } else {
        setConsentState(null);
      }
    };
    window.addEventListener("consentUpdate", handler);
    return () => window.removeEventListener("consentUpdate", handler);
  }, []);

  return (
    <>
      {/* META PIXEL - requires marketing consent */}
      {consent?.marketing && config.metaPixel.enabled && config.metaPixel.pixelId && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.metaPixel.pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${config.metaPixel.pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* GOOGLE ANALYTICS (GA4) - requires analytics consent */}
      {consent?.analytics && config.googleAnalytics.enabled && config.googleAnalytics.measurementId && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.measurementId}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAnalytics.measurementId}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `,
            }}
          />
        </>
      )}

      {/* GOOGLE TAG MANAGER - requires marketing consent (loads arbitrary tags) */}
      {consent?.marketing && config.googleTagManager.enabled && config.googleTagManager.containerId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.googleTagManager.containerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${config.googleTagManager.containerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* POSTHOG - requires analytics consent */}
      {consent?.analytics && config.posthog.enabled && config.posthog.apiKey && (
        <Script
          id="posthog-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onFeatureFlags onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${config.posthog.apiKey}', {
                api_host: '${config.posthog.apiHost || "https://eu.i.posthog.com"}',
                person_profiles: 'identified_only',
                capture_pageview: true,
                capture_pageleave: true,
                persistence: 'localStorage+cookie',
                respect_dnt: true
              });
            `,
          }}
        />
      )}

      {/* MATOMO - requires analytics consent */}
      {consent?.analytics && config.matomo.enabled && config.matomo.url && config.matomo.siteId && (
        <Script
          id="matomo-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['disableCookies']);
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="${config.matomo.url.replace(/\/$/, "")}/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${config.matomo.siteId}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
      )}
    </>
  );
}
