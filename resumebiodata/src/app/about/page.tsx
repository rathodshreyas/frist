import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ScrollText, Shield, Zap, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | ResumeBiodata.in",
  description: "Learn about ResumeBiodata.in — India's free Marathi biodata and professional resume maker. Our mission, features, and team.",
  alternates: { canonical: "https://resumebiodata.in/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <div className="marathi text-gold-600 dark:text-gold-400 text-xl mb-3">॥ श्री गणेशाय नमः ॥</div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">About ResumeBiodata.in</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          India's free platform for creating traditional Marathi marriage biodatas and professional resumes — with instant HD PDF download.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          ResumeBiodata.in was created with a simple goal: make it easy for every Maharashtrian family to create a beautiful, traditional biodata — and for every Indian professional to build an ATS-friendly resume — completely free.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We believe that creating a professional document shouldn't require design skills or expensive software. Our tools are built to be simple, fast, and accessible to everyone — whether you're on a smartphone in a village or a laptop in Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {[
          { icon: FileText, title: "Marathi Biodata", desc: "Traditional Ganpati designs with full Devanagari support, family fields, and photo upload." },
          { icon: ScrollText, title: "ATS Resume", desc: "Professional templates tested against major ATS systems used by Indian companies." },
          { icon: Zap, title: "Instant PDF", desc: "Server-side HD PDF generation using industry-grade Puppeteer technology." },
          { icon: Shield, title: "Privacy First", desc: "Your personal data is never stored on our servers. Everything is processed securely." },
          { icon: Users, title: "75,000+ Users", desc: "Trusted by thousands of families across Maharashtra and Indian professionals nationwide." },
          { icon: Star, title: "Always Free", desc: "Core features are and will always remain free. Premium templates available for ₹49." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-5 bg-muted/30 rounded-2xl">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200 dark:border-amber-700/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">Start Creating Today</h2>
        <p className="text-muted-foreground mb-6">Join 75,000+ users who trust ResumeBiodata.in</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/biodata" className="btn-gold inline-flex items-center gap-2 justify-center py-3 px-6 rounded-xl">
            <FileText className="w-4 h-4" /> Create Biodata
          </Link>
          <Link href="/resume" className="btn-outline-gold inline-flex items-center gap-2 justify-center py-3 px-6 rounded-xl">
            <ScrollText className="w-4 h-4" /> Build Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
