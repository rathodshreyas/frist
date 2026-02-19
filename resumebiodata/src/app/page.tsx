import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ScrollText, Star, Download, Shield, Zap, Users, Clock } from "lucide-react";
import AdBanner from "@/components/shared/ad-banner";
import StructuredData from "@/components/shared/structured-data";

export const metadata: Metadata = {
  title: "Free Marathi Biodata & Resume Maker | ResumeBiodata.in",
  description:
    "Create beautiful Marathi marriage biodata with Ganpati designs and professional ATS-friendly resumes online. Free HD PDF download instantly.",
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ResumeBiodata.in",
  url: "https://resumebiodata.in",
  description: "Free Marathi biodata and resume maker with instant PDF download",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://resumebiodata.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const features = [
  { icon: FileText, title: "Marathi Biodata Maker", desc: "Traditional Ganpati designs with Marathi fonts. Perfect for marriage proposals.", href: "/biodata", color: "text-gold-600" },
  { icon: ScrollText, title: "Resume Builder", desc: "ATS-friendly professional resumes that get you noticed by recruiters.", href: "/resume", color: "text-blue-600" },
  { icon: Download, title: "Instant PDF Download", desc: "High-quality A4 PDF with no watermarks. Download in seconds.", href: "/biodata", color: "text-green-600" },
  { icon: Shield, title: "Privacy First", desc: "Your data stays on your device. We never store personal information.", href: "/privacy-policy", color: "text-purple-600" },
  { icon: Zap, title: "Lightning Fast", desc: "Live preview as you type. No page reloads, instant updates.", href: "/biodata", color: "text-orange-600" },
  { icon: Star, title: "Premium Templates", desc: "Unlock beautiful premium designs for a small one-time fee.", href: "/biodata", color: "text-gold-500" },
];

const stats = [
  { value: "50,000+", label: "Biodatas Created" },
  { value: "25,000+", label: "Resumes Built" },
  { value: "4.9★", label: "User Rating" },
  { value: "100%", label: "Free to Use" },
];

const testimonials = [
  { name: "Priya Deshmukh", location: "Pune", text: "मला खूप सुंदर बायोडेटा मिळाला. खूप सोपे आणि झटपट!", rating: 5 },
  { name: "Rahul Kulkarni", location: "Mumbai", text: "The resume builder helped me land my dream job. ATS-friendly templates are excellent.", rating: 5 },
  { name: "Sunita Joshi", location: "Nashik", text: "गणपती डिझाईन असलेला बायोडेटा खूप छान आहे. माझ्या मुलाच्या लग्नासाठी खूप उपयोगी!", rating: 5 },
];

export default function HomePage() {
  return (
    <>
      <StructuredData data={homeSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-gold-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 mandala-bg">
        <div className="absolute inset-0 bg-[url('/patterns/mandala.svg')] opacity-5 dark:opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-100 dark:bg-gold-900/30 border border-gold-300 dark:border-gold-700 text-gold-700 dark:text-gold-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" />
              India's Most Trusted Biodata & Resume Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight text-balance">
              Create Your Perfect{" "}
              <span className="gold-text">Marathi Biodata</span>
              <br />& Professional Resume
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Free online maker with traditional Ganpati designs for marriage biodata and ATS-friendly
              resume templates. Download HD PDF instantly — no registration required.
            </p>

            <div className="marathi text-lg text-gold-700 dark:text-gold-400 mb-10">
              मराठी बायोडेटा आणि रेझ्युमे — मोफत आणि त्वरित
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/biodata"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gold-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                Create Biodata — Free
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <ScrollText className="w-5 h-5" />
                Build Resume — Free
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center bg-white/60 dark:bg-white/5 backdrop-blur border border-gold-200/50 dark:border-gold-700/30 rounded-2xl p-6">
                <div className="text-3xl font-display font-bold text-gold-600 dark:text-gold-400">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Powerful tools to create stunning biodatas and resumes without any design experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <Link
                key={feat.title}
                href={feat.href}
                className="group p-6 bg-gray-50 dark:bg-neutral-900 border border-border hover:border-gold-400 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <feat.icon className={`w-8 h-8 ${feat.color} mb-4`} />
                <h3 className="font-display font-semibold text-gray-900 dark:text-white text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page Ad */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <AdBanner slot="2345678901" format="rectangle" />
      </div>

      {/* How It Works */}
      <section className="py-20 bg-cream-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white text-center mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Fill Your Details", desc: "Enter your personal information in our easy, guided form. Supports both Marathi and English.", icon: Users },
              { step: "02", title: "Choose Template", desc: "Pick from our beautiful collection of biodata and resume templates. Preview live instantly.", icon: Star },
              { step: "03", title: "Download PDF", desc: "Get your HD A4 PDF in seconds. Share it digitally or print it professionally.", icon: Download },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient text-white text-2xl font-bold font-display mb-4 shadow-lg shadow-gold-500/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-cream-50 dark:bg-neutral-900 border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-500 dark:from-gold-700 dark:to-gold-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Tips & Guides for Better Biodata & Resumes
          </h2>
          <p className="text-gold-100 mb-8">
            Expert advice on writing the perfect marriage biodata and landing your dream job.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="px-6 py-3 bg-white text-gold-700 font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
              Read Blog
            </Link>
            <Link href="/blog/marathi-biodata-format" className="px-6 py-3 bg-gold-700 text-white font-semibold rounded-xl hover:bg-gold-800 transition-all duration-200">
              Marathi Biodata Format Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="3456789012" format="horizontal" />
      </div>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            <Link href="/blog" className="text-gold-600 dark:text-gold-400 text-sm font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Perfect Marathi Marriage Biodata Format 2024", slug: "marathi-biodata-format", category: "Biodata Tips", time: "5 min read" },
              { title: "How to Write an ATS-Friendly Resume in India", slug: "ats-friendly-resume-india", category: "Resume Tips", time: "7 min read" },
              { title: "Top 10 Biodata Mistakes to Avoid for Marriage", slug: "biodata-mistakes-to-avoid", category: "Biodata Tips", time: "4 min read" },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl overflow-hidden border border-border hover:border-gold-400 transition-all duration-200 hover:shadow-md">
                  <div className="h-40 bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/30 dark:to-gold-800/20 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gold-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gold-600 dark:text-gold-400 font-medium">{post.category}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
