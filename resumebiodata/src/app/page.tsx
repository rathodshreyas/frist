import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, ScrollText, Download, Star, Shield, Zap,
  Users, Clock, ArrowRight, ChevronRight, BookOpen, CheckCircle
} from "lucide-react";
import AdBanner from "@/components/shared/AdBanner";
import StructuredData from "@/components/shared/StructuredData";
import { getFeaturedPosts } from "@/data/blog-posts";
import { truncate, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Marathi Biodata & Resume Maker — ResumeBiodata.in",
  description:
    "Create beautiful Marathi marriage biodata with Ganpati designs and ATS-friendly resumes online for free. Instant HD PDF download. Traditional Devanagari fonts. No registration needed.",
  alternates: { canonical: "https://resumebiodata.in" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ResumeBiodata.in",
  url: "https://resumebiodata.in",
  description: "Free Marathi biodata and professional resume maker with instant PDF download",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://resumebiodata.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ResumeBiodata.in",
  url: "https://resumebiodata.in",
  logo: "https://resumebiodata.in/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@resumebiodata.in",
    availableLanguage: ["English", "Marathi"],
  },
};

const stats = [
  { value: "75,000+", label: "Biodatas Created", icon: FileText },
  { value: "40,000+", label: "Resumes Built", icon: ScrollText },
  { value: "4.9 ★", label: "Average Rating", icon: Star },
  { value: "100%", label: "Free to Use", icon: Shield },
];

const features = [
  {
    emoji: "🙏",
    title: "Marathi Biodata Maker",
    titleMarathi: "मराठी बायोडेटा निर्माता",
    desc: "Traditional Ganpati designs with Devanagari fonts, family details, gotra & more.",
    href: "/biodata",
    cta: "Create Biodata",
    color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5",
    border: "border-amber-200 dark:border-amber-800/30",
  },
  {
    emoji: "📄",
    title: "ATS Resume Builder",
    titleMarathi: "रेझ्युमे बिल्डर",
    desc: "Professional, ATS-optimized resumes that get you noticed by recruiters.",
    href: "/resume",
    cta: "Build Resume",
    color: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5",
    border: "border-blue-200 dark:border-blue-800/30",
  },
  {
    emoji: "⚡",
    title: "Instant HD PDF",
    titleMarathi: "त्वरित PDF",
    desc: "Server-side PDF generation with A4 format, HD quality, and no watermarks.",
    href: "/biodata",
    cta: "Try Now",
    color: "from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5",
    border: "border-green-200 dark:border-green-800/30",
  },
  {
    emoji: "🔒",
    title: "Privacy First",
    titleMarathi: "गोपनीयता",
    desc: "Your data never leaves your device for free tools. Secure and private by design.",
    href: "/privacy-policy",
    cta: "Learn More",
    color: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5",
    border: "border-purple-200 dark:border-purple-800/30",
  },
  {
    emoji: "🎨",
    title: "Multiple Templates",
    titleMarathi: "टेम्पलेट्स",
    desc: "Free and premium templates for biodata and resumes. Traditional and modern styles.",
    href: "/biodata#templates",
    cta: "See Templates",
    color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/5 dark:to-pink-500/5",
    border: "border-rose-200 dark:border-rose-800/30",
  },
  {
    emoji: "📱",
    title: "Mobile Friendly",
    titleMarathi: "मोबाईल",
    desc: "Fully responsive design. Create and download your documents on any device.",
    href: "/biodata",
    cta: "Try Now",
    color: "from-sky-500/10 to-cyan-500/10 dark:from-sky-500/5 dark:to-cyan-500/5",
    border: "border-sky-200 dark:border-sky-800/30",
  },
];

const testimonials = [
  {
    name: "Priya Kulkarni",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "माझ्या मुलाच्या लग्नासाठी खूप सुंदर बायोडेटा तयार झाला. गणपती डिझाईन खूप आवडली सर्वांना!",
    translation: "Created a beautiful biodata for my son's marriage. Everyone loved the Ganpati design!",
  },
  {
    name: "Rahul Deshpande",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "The resume builder is excellent. Got 5 interview calls within a week of using the ATS template. Highly recommended!",
  },
  {
    name: "Sunita Joshi",
    location: "Nashik, Maharashtra",
    rating: 5,
    text: "एकदम सोपे आणि मोफत! माझा बायोडेटा 10 मिनिटात तयार झाला आणि PDF खूप छान आली.",
    translation: "Very easy and free! My biodata was ready in 10 minutes and the PDF came out beautifully.",
  },
];

const howItWorks = [
  { step: "01", title: "Fill Your Details", desc: "Enter your personal, family, and career information in our guided form.", icon: Users },
  { step: "02", title: "Choose Template", desc: "Pick from traditional Ganpati designs or modern minimal templates.", icon: Star },
  { step: "03", title: "Download HD PDF", desc: "Get your A4 PDF instantly — no watermarks, no registration.", icon: Download },
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/20 dark:via-background dark:to-background pt-12 pb-20">
        {/* Decorative bg pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.03),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-100 dark:bg-gold-900/30 border border-gold-300 dark:border-gold-700/50 text-gold-700 dark:text-gold-400 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>India&apos;s #1 Free Marathi Biodata & Resume Platform</span>
            </div>

            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-6 leading-[1.05] text-balance animate-slide-up">
              Create Your Perfect{" "}
              <span className="gold-text">Marathi Biodata</span>
              {" & "}
              <span className="text-foreground">Professional Resume</span>
            </h1>

            <div className="marathi text-xl text-gold-700 dark:text-gold-400 mb-4 animate-fade-in" style={{animationDelay:"0.1s"}}>
              ॥ श्री गणेशाय नमः ॥ — मोफत बायोडेटा व रेझ्युमे निर्माता
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{animationDelay:"0.15s"}}>
              Traditional Ganpati designs for marriage biodata + ATS-friendly resumes.
              Free HD PDF download in minutes — no registration, no watermarks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay:"0.2s"}}>
              <Link href="/biodata" className="btn-gold inline-flex items-center justify-center gap-2 text-base py-4 px-8 rounded-2xl">
                <FileText className="w-5 h-5" />
                <span>Create Biodata — Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold py-4 px-8 rounded-2xl border-2 border-border bg-card text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <ScrollText className="w-5 h-5" />
                <span>Build Resume — Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in" style={{animationDelay:"0.3s"}}>
              {["No registration", "No watermarks", "HD quality PDF", "100% free"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center bg-card/80 backdrop-blur border border-border rounded-2xl p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 animate-slide-up"
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-display font-bold gold-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <div className="max-w-5xl mx-auto px-4 py-3">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1234567890"} format="horizontal" />
      </div>

      {/* ============ FEATURES ============ */}
      <section className="py-20 bg-background" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="features-heading" className="section-title mb-4">
              Everything You Need
            </h2>
            <p className="section-subtitle">
              Professional tools that make creating biodatas and resumes effortless — even if you have no design experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <Link
                key={feat.title}
                href={feat.href}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} card-hover`}
                aria-label={`${feat.title}: ${feat.desc}`}
              >
                <div className="text-3xl mb-4">{feat.emoji}</div>
                <h3 className="font-display font-bold text-foreground text-xl mb-0.5">{feat.title}</h3>
                <div className="marathi text-xs text-muted-foreground mb-2">{feat.titleMarathi}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{feat.desc}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  {feat.cta} <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 bg-muted/30" aria-labelledby="how-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="how-heading" className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle">Create your biodata or resume in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl gold-gradient flex items-center justify-center shadow-gold group-hover:shadow-gold-lg group-hover:-translate-y-1 transition-all duration-300">
                  <span className="font-display font-bold text-white text-xl">{step.step}</span>
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/biodata" className="btn-gold inline-flex items-center gap-2 text-base py-4 px-8 rounded-2xl">
              Get Started Now — It&apos;s Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mid Ad */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE || "2345678901"} format="rectangle" />
      </div>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 bg-background" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="section-title mb-4">Loved by Thousands</h2>
            <p className="section-subtitle">Real users who created their biodata and resumes with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <blockquote>
                  <p className="marathi text-sm text-foreground leading-relaxed mb-2">"{t.text}"</p>
                  {t.translation && (
                    <p className="text-xs text-muted-foreground italic">({t.translation})</p>
                  )}
                </blockquote>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG PREVIEW ============ */}
      <section className="py-20 bg-muted/30" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 id="blog-heading" className="section-title mb-2">Expert Guides & Tips</h2>
              <p className="text-muted-foreground">Biodata and resume advice from our team</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredPosts.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
                aria-label={`Read: ${post.title}`}
              >
                <div className="h-44 bg-gradient-to-br from-gold-100 to-amber-100 dark:from-gold-900/20 dark:to-amber-900/10 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gold-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full font-medium capitalize">
                      {post.category.replace(/-/g, " ")}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg leading-snug group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {truncate(post.description, 120)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog" className="btn-outline-gold inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Read All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="marathi text-amber-100 text-2xl mb-3">॥ शुभारंभ करा ॥</div>
          <h2 className="text-4xl font-display font-bold text-white mb-4 text-balance">
            Ready to Create Your Perfect Biodata or Resume?
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            Join 75,000+ users who have created their biodata and resumes with ResumeBiodata.in
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/biodata"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-bold py-4 px-8 rounded-2xl hover:bg-amber-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            >
              <FileText className="w-5 h-5" />
              Create Biodata Now
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 bg-amber-800/50 text-white font-bold py-4 px-8 rounded-2xl hover:bg-amber-800/70 border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <ScrollText className="w-5 h-5" />
              Build Resume Now
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "3456789012"} format="horizontal" />
      </div>
    </>
  );
}
