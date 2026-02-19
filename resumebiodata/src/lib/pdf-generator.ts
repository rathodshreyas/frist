import { NextResponse } from "next/server";

// ─── Browser singleton ───────────────────────────────────────────────────────
let _browser: import("puppeteer-core").Browser | null = null;

async function getBrowser(): Promise<import("puppeteer-core").Browser> {
  if (_browser) {
    try {
      // health check
      await _browser.version();
      return _browser;
    } catch {
      _browser = null;
    }
  }

  const puppeteer = (await import("puppeteer-core")).default;

  // ─── Vercel / Lambda / Production ─────────────────────────────────────────
  if (
    process.env.VERCEL === "1" ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NODE_ENV === "production"
  ) {
    const chromium = (await import("@sparticuz/chromium")).default;

    // Required for serverless: pre-download chromium binary
    chromium.setHeadlessMode = true;
    chromium.setGraphicsMode = false;

    _browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--hide-scrollbars",
        "--disable-web-security",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",          // critical for Vercel
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-client-side-phishing-detection",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-domain-reliability",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-popup-blocking",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-sync",
        "--disable-translate",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-default-browser-check",
        "--safebrowsing-disable-auto-update",
      ],
      defaultViewport: { width: 794, height: 1123, deviceScaleFactor: 1 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  } else {
    // ─── Local Development ───────────────────────────────────────────────────
    const localChrome =
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : "/usr/bin/google-chrome-stable";

    _browser = await puppeteer.launch({
      headless: true,
      executablePath: localChrome,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }

  return _browser;
}

// ─── HTML → PDF ──────────────────────────────────────────────────────────────
export async function htmlToPDF(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Block unnecessary resources to speed up rendering
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      if (["media", "websocket", "eventsource"].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Increase viewport for A4
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle0"],
      timeout: 45000,
    });

    // Wait for fonts to fully load
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    // Extra paint time for complex layouts
    await new Promise((r) => setTimeout(r, 800));

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      scale: 1,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close().catch(() => {});
  }
}

// ─── Response Helper ─────────────────────────────────────────────────────────
export function createPDFResponse(buffer: Buffer, filename: string): NextResponse {
  const safe = encodeURIComponent(filename.replace(/[^\w\u0900-\u097F\s-]/g, "").trim());

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${safe}.pdf`,
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
