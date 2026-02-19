import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeBiodata.in",
  description: "Privacy policy for ResumeBiodata.in. Learn how we handle your data and protect your privacy.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Last updated: January 15, 2024</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            ResumeBiodata.in is designed with privacy in mind. When you use our biodata or resume maker,
            the information you enter (such as your name, birth date, education, and contact details)
            is processed locally in your browser and is only sent to our servers temporarily when you
            request a PDF download. We do not permanently store your personal biodata or resume data.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            We may collect non-personal information including browser type, pages visited, time spent on
            pages, and other analytics data through Google Analytics to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">We use collected information to:</p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            <li>Generate and deliver your requested PDF documents</li>
            <li>Improve our website and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">3. Google AdSense</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on
            your prior visits to our website or other websites. You can opt out of personalized advertising
            by visiting Google's Ads Settings. For more information, see Google's Privacy & Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">4. Cookies</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use essential cookies for website functionality and third-party cookies for analytics (Google
            Analytics) and advertising (Google AdSense). You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">5. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We implement appropriate security measures to protect your information. PDF generation occurs
            over encrypted HTTPS connections. Personal data submitted for PDF generation is not stored
            after the PDF is created and delivered.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">6. Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our website uses the following third-party services:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            <li>Google Analytics (traffic analysis)</li>
            <li>Google AdSense (advertising)</li>
            <li>Razorpay (payment processing for premium features)</li>
            <li>Vercel (web hosting)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">7. Children's Privacy</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our services are intended for users aged 18 and above. We do not knowingly collect personal
            information from children under 18.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at:
            <br />Email: privacy@resumebiodata.in
          </p>
        </section>
      </div>
    </div>
  );
}
