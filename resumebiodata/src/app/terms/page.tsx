import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | ResumeBiodata.in",
  description: "Terms and conditions for using ResumeBiodata.in services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Terms & Conditions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Last updated: January 15, 2024</p>

      <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using ResumeBiodata.in, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">2. Use of Services</h2>
          <p>ResumeBiodata.in provides free tools for creating biodatas and resumes. You may:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use our tools for personal, non-commercial purposes</li>
            <li>Download PDFs for your own use</li>
            <li>Share your created documents with others</li>
          </ul>
          <p className="mt-3">You may not:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use our services for illegal activities</li>
            <li>Attempt to reverse engineer or compromise our systems</li>
            <li>Use automated bots to scrape our website</li>
            <li>Submit false or misleading information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">3. Intellectual Property</h2>
          <p>All website content, templates, and designs are the intellectual property of ResumeBiodata.in. The PDFs you create belong to you. Our templates may not be reproduced or resold without permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">4. Premium Services</h2>
          <p>Some templates are premium and require a one-time payment. Payments are processed securely via Razorpay. Refunds are available within 48 hours of purchase if the service doesn't work as described.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">5. Disclaimer</h2>
          <p>Our services are provided "as is" without warranties of any kind. We are not responsible for any errors in the generated documents. Users are responsible for verifying all information in their biodatas and resumes.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">6. Limitation of Liability</h2>
          <p>ResumeBiodata.in shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">8. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Maharashtra, India.</p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">9. Contact</h2>
          <p>For questions about these Terms, contact us at: legal@resumebiodata.in</p>
        </section>
      </div>
    </div>
  );
}
