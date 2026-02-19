import type { Metadata } from "next";
import ResumeBuilder from "@/components/resume/resume-builder";
import AdBanner from "@/components/shared/ad-banner";
import StructuredData from "@/components/shared/structured-data";

export const metadata: Metadata = {
  title: "Free ATS-Friendly Resume Builder Online | ResumeBiodata.in",
  description: "Create professional ATS-friendly resumes online for free. Modern templates, live preview, and instant PDF download. No registration required.",
  keywords: ["resume builder India", "ATS friendly resume", "free resume maker", "professional resume template", "CV maker online"],
  openGraph: {
    title: "Free Resume Builder | ResumeBiodata.in",
    description: "Build professional ATS-friendly resumes with live preview. Free PDF download.",
    url: "https://resumebiodata.in/resume",
  },
};

const resumeSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online Resume Builder",
  url: "https://resumebiodata.in/resume",
  description: "Free ATS-friendly resume builder with professional templates",
  applicationCategory: "Utility",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export default function ResumePage() {
  return (
    <>
      <StructuredData data={resumeSchema} />

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-950 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium px-4 py-1 rounded-full mb-3 border border-blue-200 dark:border-blue-700">
            📄 ATS-Optimized Templates
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Professional Resume Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Build ATS-friendly resumes that get noticed by recruiters. Live preview, professional templates, free PDF download.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdBanner slot="6789012345" format="horizontal" />
      </div>

      <ResumeBuilder />

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <AdBanner slot="7890123456" format="horizontal" />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
          How to Build an ATS-Friendly Resume
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Our resume builder is designed to help you create resumes that pass ATS (Applicant Tracking System)
          filters used by 99% of large companies in India. Use simple formatting, relevant keywords, and clean
          layouts to maximize your chances.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Fill in your details across sections — personal information, career objective, education, work experience,
          skills, and projects. Download your professional resume as a high-quality PDF instantly.
        </p>
      </section>
    </>
  );
}
