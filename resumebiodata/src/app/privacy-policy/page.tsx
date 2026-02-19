import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeBiodata.in",
  description: "Privacy Policy for ResumeBiodata.in — how we collect, use, and protect your information.",
  alternates: { canonical: "https://resumebiodata.in/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-display font-bold text-foreground mb-3">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Information We Collect</h2>
          <p>ResumeBiodata.in is designed with privacy in mind. Here's what we collect:</p>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Form Data:</strong> When you create a biodata or resume, the information you enter is processed temporarily in your browser and on our servers solely to generate the PDF. We do not permanently store your personal biodata or resume data.</li>
            <li><strong className="text-foreground">Usage Analytics:</strong> We use Google Analytics to understand how users interact with our platform (page views, session duration, device type). This data is anonymized.</li>
            <li><strong className="text-foreground">Payment Data:</strong> If you purchase a premium template, payment is processed securely by Razorpay. We do not store your card details.</li>
            <li><strong className="text-foreground">Contact Form:</strong> If you contact us, we store your name, email, and message to respond to your inquiry.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To generate and deliver your requested PDF document</li>
            <li>To process payments for premium features</li>
            <li>To respond to your support or feedback inquiries</li>
            <li>To improve our platform based on usage patterns</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Google AdSense</h2>
          <p>We use Google AdSense to display advertisements. Google may use cookies to show you relevant ads based on your browsing history. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Cookies</h2>
          <p>We use cookies for:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Theme preference (dark/light mode)</li>
            <li>Google Analytics tracking</li>
            <li>Google AdSense advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your information. All data transmission is encrypted using HTTPS/TLS.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Third-Party Services</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong className="text-foreground">Google Analytics:</strong> Website usage analytics</li>
            <li><strong className="text-foreground">Google AdSense:</strong> Advertisement delivery</li>
            <li><strong className="text-foreground">Razorpay:</strong> Payment processing</li>
            <li><strong className="text-foreground">Vercel:</strong> Website hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">7. Your Rights</h2>
          <p>You have the right to access, correct, or delete any personal data we hold about you. Contact us at <a href="mailto:contact@resumebiodata.in" className="text-primary hover:underline">contact@resumebiodata.in</a>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">8. Contact</h2>
          <p>For privacy-related questions: <a href="mailto:contact@resumebiodata.in" className="text-primary hover:underline">contact@resumebiodata.in</a></p>
        </section>
      </div>
    </div>
  );
}
