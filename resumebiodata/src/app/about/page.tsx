import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | ResumeBiodata.in",
  description: "Learn about ResumeBiodata.in - India's free Marathi biodata and resume maker platform.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">About ResumeBiodata.in</h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
        <p>
          ResumeBiodata.in was created with a simple mission: to help every Indian create beautiful, professional
          biodatas and resumes without any design expertise or expensive software.
        </p>

        <div className="bg-cream-50 dark:bg-neutral-900 border border-gold-200 dark:border-gold-800 rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
          <p className="marathi text-gold-700 dark:text-gold-400 text-lg mb-2">
            प्रत्येक मराठी माणसाला सुंदर बायोडेटा बनवण्याचे स्वप्न
          </p>
          <p>
            We believe everyone deserves a great biodata for their marriage journey and a professional resume
            for their career. Our tools are free, fast, and require no technical skills.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">What We Offer</h2>
          <ul className="space-y-2">
            <li>✅ Free Marathi marriage biodata maker with Ganpati designs</li>
            <li>✅ Professional ATS-friendly resume builder</li>
            <li>✅ Instant HD PDF download with no watermarks</li>
            <li>✅ Multiple traditional and modern templates</li>
            <li>✅ Expert blog on biodata and resume writing</li>
            <li>✅ 100% privacy — your data is never stored</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">Our Technology</h2>
          <p>
            Built with modern web technology including Next.js, TypeScript, and Puppeteer for PDF generation.
            Our platform is optimized for speed, with Core Web Vitals scores in the green across all metrics.
          </p>
        </section>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="/biodata" className="px-6 py-3 gold-gradient text-white font-semibold rounded-xl hover:shadow-md transition-all">
            Create Biodata
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-border text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
