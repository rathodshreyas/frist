"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle" | "fluid";
  className?: string;
  label?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  slot,
  format = "auto",
  className,
  label = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!publisherId || initialized.current || !adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (err) {
      console.warn("[AdSense] Failed to push ad:", err);
    }
  }, [publisherId]);

  // Development placeholder
  if (!publisherId) {
    const heightMap = {
      auto: "h-24",
      horizontal: "h-24",
      vertical: "h-[600px]",
      rectangle: "h-64",
      fluid: "h-32",
    };

    return (
      <div
        className={cn(
          "ad-container w-full",
          heightMap[format],
          className
        )}
        aria-label="Advertisement placeholder"
      >
        <span>Advertisement</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)} role="complementary" aria-label="Advertisement">
      {label && (
        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider mb-1 opacity-60">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
