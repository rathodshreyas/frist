"use client";
import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "rectangle" | "vertical" | "auto";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const loaded = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!clientId || loaded.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      loaded.current = true;
    } catch {}
  }, [clientId]);

  if (!clientId) {
    // Placeholder for development / no AdSense
    const heights = { horizontal: "h-24", rectangle: "h-64", vertical: "h-[600px]", auto: "h-28" };
    return (
      <div className={`ad-container w-full ${heights[format]} ${className}`}>
        <span className="text-xs opacity-50">Advertisement</span>
      </div>
    );
  }

  const adLayouts: Record<string, string> = {
    horizontal: "leaderboard",
    rectangle: "rectangle",
    vertical: "wide_skyscraper",
    auto: "auto",
  };

  return (
    <div className={`overflow-hidden ${className}`} aria-label="Advertisement">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={adLayouts[format]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
