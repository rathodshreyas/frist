import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
    { media: "(prefers-color-scheme: dark)", color: "#d97706" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://resumebiodata.in"),
  title: {
    default: "ResumeBiodata.in — Free Marathi Biodata & Resume Maker",
    template: "%s | ResumeBiodata.in",
  },
  description:
    "Create beautiful Marathi marriage biodata with Ganpati designs and ATS-friendly professional resumes. Free HD PDF download instantly — no registration required.",
  keywords: [
    "marathi biodata maker",
    "marriage biodata",
    "free biodata maker",
    "resume builder india",
    "विवाह बायोडेटा",
    "मराठी बायोडेटा",
    "ATS resume builder",
    "free pdf download",
    "ganpati biodata",
    "biodata format marathi",
  ],
  authors: [{ name: "ResumeBiodata.in", url: "https://resumebiodata.in" }],
  creator: "ResumeBiodata.in",
  publisher: "ResumeBiodata.in",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["mr_IN", "hi_IN"],
    url: "https://resumebiodata.in",
    siteName: "ResumeBiodata.in",
    title: "Free Marathi Biodata & Resume Maker | ResumeBiodata.in",
    description:
      "Create beautiful Marathi marriage biodata with traditional Ganpati designs. Free HD PDF download. No registration required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeBiodata.in — Free Marathi Biodata & Resume Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marathi Biodata & Resume Maker",
    description: "Create traditional Marathi biodatas and professional resumes. Free PDF download.",
    images: ["/og-image.png"],
    creator: "@resumebiodata",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://resumebiodata.in",
    languages: {
      "en-IN": "https://resumebiodata.in",
      "mr-IN": "https://resumebiodata.in",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "font-sans",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
