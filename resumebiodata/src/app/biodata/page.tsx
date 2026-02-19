import type { Metadata } from "next";
import BiodataBuilder from "@/components/biodata/BiodataBuilder";
import AdBanner from "@/components/shared/AdBanner";
import StructuredData from "@/components/shared/StructuredData";

export const metadata: Metadata = {
  title: "Free Marathi Marriage Biodata Maker — Ganpati Design | ResumeBiodata.in",
  description:
    "Create beautiful Marathi marriage biodata online for free. Traditional Ganpati designs, Devanagari fonts, photo upload, and instant A4 HD PDF download. No registration required.",
  keywords: [
    "marathi biodata maker", "मराठी बायोडेटा", "marriage biodata marathi",
    "free biodata pdf", "ganpati biodata template", "biodata for marriage",
    "विवाह बायोडेटा", "लग्नाचा बायोडेटा", "biodata maker online",
  ],
  openGraph: {
    title: "Free Marathi Biodata Maker — Traditional Ganpati Design",
    description: "Create traditional Marathi marriage biodata with Ganpati designs. Free HD PDF download.",
    url: "https://resumebiodata.in/biodata",
  },
  alternates: { canonical: "https://resumebiodata.in/biodata" },
};

const biodataAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Marathi Biodata Maker",
  url: "https://resumebiodata.in/biodata",
  description: "Free Marathi marriage biodata maker with traditional Ganpati designs",
  applicationCategory: "Utility",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  featureList: [
    "Traditional Ganpati header design",
    "Devanagari (Marathi) font support",
    "Photo upload with auto-crop",
    "Live preview",
    "A4 HD PDF download",
    "Multiple templates",
    "Bilingual (Marathi + English) support",
  ],
};

export default function BiodataPage() {
  return (
    <>
      <StructuredData data={biodataAppSchema} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 border-b border-amber-200/50 dark:border-amber-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="marathi text-2xl text-gold-600 dark:text-gold-400 mb-2 font-bold">
              ॥ श्री गणेशाय नमः ॥
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
              Marathi Marriage Biodata Maker
            </h1>
            <p className="marathi text-gold-700 dark:text-gold-400 text-lg mb-3">
              मोफत मराठी विवाह बायोडेटा निर्माता
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fill in your details, choose a template, and download a beautiful A4 PDF biodata instantly.
              Traditional Ganpati designs with full Marathi language support.
            </p>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="max-w-5xl mx-auto px-4 py-3">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1234567890"} format="horizontal" />
      </div>

      {/* Main Builder Component */}
      <BiodataBuilder />

      {/* Bottom Ad */}
      <div className="max-w-5xl mx-auto px-4 py-4 mb-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "3456789012"} format="horizontal" />
      </div>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          मराठी बायोडेटा कसा बनवायचा? | How to Create Marathi Biodata
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
          <p>
            Our free Marathi biodata maker lets you create a professional marriage biodata in minutes.
            Simply fill in your details across the form sections — personal information, education, career,
            family background, and contact details.
          </p>
          <p>
            Choose from our traditional <strong>Ganpati Classic</strong> template (with the auspicious
            ॥ श्री गणेशाय नमः ॥ header and ornate gold borders) or the modern <strong>Royal Lotus</strong> template
            with a rich maroon color scheme.
          </p>
          <p>
            Your biodata is generated as an A4-size HD PDF, perfect for printing and digital sharing.
            The PDF includes proper margins, professional typography, and your photo (if uploaded).
          </p>
        </div>
      </section>
    </>
  );
}
