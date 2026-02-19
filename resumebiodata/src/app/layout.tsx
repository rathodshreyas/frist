import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resumebiodata.in"),
  title: {
    default: "ResumedBiodata.in - Free Biodata & Resume Maker Online",
    template: "%s | ResumeBiodata.in",
  },
  description:
    "Create professional Marathi marriage biodata and modern resumes online for free. Download HD PDF instantly. Traditional Ganpati designs with custom Marathi fonts.",
  keywords: [
    "Marathi biodata maker",
    "marriage biodata format",
    "biodata PDF download",
    "resume builder online",
    "Marathi biodata template",
    "free resume maker India",
    "biodata for marriage",
    "लग्नाचा बायोडेटा",
    "मराठी बायोडेटा",
    "ATS resume builder",
  ],
  authors: [{ name: "ResumeBiodata.in" }],
  creator: "ResumeBiodata.in",
  publisher: "ResumeBiodata.in",
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "mr_IN",
    url: "https://resumebiodata.in",
    siteName: "ResumeBiodata.in",
    title: "Free Marathi Biodata & Resume Maker | ResumeBiodata.in",
    description:
      "Create beautiful Marathi marriage biodata and professional resumes. Free PDF download with HD quality.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ResumeBiodata.in" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marathi Biodata & Resume Maker | ResumeBiodata.in",
    description: "Create Marathi marriage biodata and resumes online. Free PDF download.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://resumebiodata.in",
    languages: { "en-IN": "https://resumebiodata.in", "mr-IN": "https://resumebiodata.in/mr" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#eab308" />
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
