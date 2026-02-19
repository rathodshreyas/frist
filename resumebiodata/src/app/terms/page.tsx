import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | ResumeBiodata.in",
  description: "Terms and Conditions for using ResumeBiodata.in services.",
  alternates: { canonical: "https://resumebiodata.in/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-display font-bold text-foreground mb-3">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>By using ResumeBiodata.in, you agree to these Terms & Conditions. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Use of Services</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Our services are provided for personal, non-commercial use</li>
            <li>You must provide accurate information when creating documents</li>
            <li>You are responsible for the content you create using our tools</li>
            <li>Do not use our platform to create fraudulent or misleading documents</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Free & Premium Features</h2>
          <p>Core features (basic templates, PDF generation) are free. Premium templates require a one-time payment of ₹49. Premium access is non-transferable and non-refundable after PDF download.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Intellectual Property</h2>
          <p>The documents you create using our tools belong to you. ResumeBiodata.in retains rights to our template designs, code, and platform. You may not copy or redistribute our templates.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
          <p>ResumeBiodata.in provides tools "as is" without warranty. We are not liable for any outcomes resulting from use of documents created on our platform, including job applications or marriage proposals.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Governing Law</h2>
          <p>These terms are governed by the laws of India. Disputes will be subject to jurisdiction of courts in Maharashtra, India.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">7. Contact</h2>
          <p>Questions? Email us at <a href="mailto:contact@resumebiodata.in" className="text-primary hover:underline">contact@resumebiodata.in</a></p>
        </section>
      </div>
    </div>
  );
}
