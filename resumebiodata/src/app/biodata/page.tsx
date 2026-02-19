import type { Metadata } from "next";
import BiodataBuilder from "@/components/biodata/biodata-builder";
import AdBanner from "@/components/shared/ad-banner";
import StructuredData from "@/components/shared/structured-data";

export const metadata: Metadata = {
  title: "Free Marathi Biodata Maker - Traditional Ganpati Design | ResumeBiodata.in",
  description:
    "Create beautiful Marathi marriage biodata online for free. Traditional Ganpati designs, Marathi fonts, photo upload, and instant HD PDF download. No registration required.",
  keywords: [
    "Marathi biodata maker",
    "लग्नाचा बायोडेटा",
    "marriage biodata Marathi",
    "free biodata PDF",
    "Ganpati biodata template",
    "मराठी बायोडेटा",
  ],
  openGraph: {
    title: "Free Marathi Biodata Maker | ResumeBiodata.in",
    description: "Create traditional Marathi marriage biodata with Ganpati designs. Free HD PDF download.",
    url: "https://resumebiodata.in/biodata",
  },
};

const biodataSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Marathi Biodata Maker",
  url: "https://resumebiodata.in/biodata",
  description: "Free Marathi marriage biodata maker with Ganpati designs and instant PDF download",
  applicationCategory: "Utility",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  featureList: [
    "Traditional Ganpati header design",
    "Marathi language support",
    "Live preview",
    "Instant PDF download",
    "Photo upload",
    "Multiple templates",
  ],
};

export default function BiodataPage() {
  return (
    <>
      <StructuredData data={biodataSchema} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-cream-50 to-gold-50 dark:from-neutral-900 dark:to-neutral-950 border-b border-gold-200 dark:border-gold-800/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-sm font-medium px-4 py-1 rounded-full mb-3 border border-gold-200 dark:border-gold-700">
              🙏 Traditional Marathi Design
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Marathi Marriage Biodata Maker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Create your traditional Marathi biodata with beautiful Ganpati designs. Fill the form, preview
              instantly, and download HD PDF for free.
            </p>
            <p className="marathi text-gold-600 dark:text-gold-400 mt-2 text-sm">
              मोफत मराठी बायोडेटा बनवा — तात्काळ PDF डाऊनलोड करा
            </p>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdBanner slot="4567890123" format="horizontal" />
      </div>

      {/* Main Builder */}
      <BiodataBuilder />

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <AdBanner slot="5678901234" format="horizontal" />
      </div>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-12 prose prose-gray dark:prose-invert max-w-none">
        <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">
          मराठी बायोडेटा कसा बनवायचा? | How to Create Marathi Biodata
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Our free Marathi biodata maker lets you create a traditional marriage biodata in minutes. Simply fill
          in your personal details, family information, education, and contact details. Choose from our
          beautiful Ganpati-themed templates and download your biodata as a high-quality A4 PDF.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          The biodata is formatted perfectly for printing and digital sharing. It supports Marathi (Devanagari
          script), English, and bilingual formats. No registration or payment required for basic templates.
        </p>
      </section>
    </>
  );
}
