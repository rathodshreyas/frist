import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Tag, ChevronRight } from "lucide-react";
import AdBanner from "@/components/shared/ad-banner";
import StructuredData from "@/components/shared/structured-data";

export const metadata: Metadata = {
  title: "Blog - Biodata & Resume Writing Tips | ResumeBiodata.in",
  description: "Expert tips on creating the perfect Marathi marriage biodata, writing ATS-friendly resumes, and acing job interviews. Free guides in Hindi and English.",
  alternates: { canonical: "https://resumebiodata.in/blog" },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ResumeBiodata.in Blog",
  url: "https://resumebiodata.in/blog",
  description: "Tips and guides for biodata and resume writing",
};

const CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "biodata-tips", label: "Biodata Tips" },
  { id: "resume-tips", label: "Resume Tips" },
  { id: "marriage-biodata", label: "Marriage Biodata" },
  { id: "interview-tips", label: "Interview Tips" },
  { id: "marathi-format", label: "Marathi Format" },
];

const BLOG_POSTS = [
  {
    slug: "marathi-biodata-format",
    title: "Perfect Marathi Marriage Biodata Format 2024 - Complete Guide",
    description: "Learn how to create the perfect Marathi marriage biodata with our step-by-step guide. Includes traditional format, fields to include, and do's and don'ts.",
    category: "marriage-biodata",
    tags: ["marathi biodata", "marriage biodata", "biodata format"],
    publishedAt: "2024-01-15",
    readTime: 5,
    featured: true,
  },
  {
    slug: "ats-friendly-resume-india",
    title: "How to Write an ATS-Friendly Resume for Indian Job Market",
    description: "Everything you need to know about creating resumes that pass ATS filters. Includes real examples and proven templates for Indian job seekers.",
    category: "resume-tips",
    tags: ["ATS resume", "job search India", "resume writing"],
    publishedAt: "2024-01-20",
    readTime: 7,
    featured: true,
  },
  {
    slug: "biodata-mistakes-to-avoid",
    title: "Top 10 Biodata Mistakes That Can Ruin Your Marriage Prospects",
    description: "Avoid these common biodata mistakes that many people make. Learn what to include, what to avoid, and how to present yourself in the best light.",
    category: "biodata-tips",
    tags: ["biodata tips", "marriage biodata", "common mistakes"],
    publishedAt: "2024-02-01",
    readTime: 4,
    featured: false,
  },
  {
    slug: "marathi-marriage-format",
    title: "Traditional vs Modern Marathi Marriage Biodata: Which is Better?",
    description: "A detailed comparison of traditional and modern Marathi biodata formats. Find out which style works best for your specific requirements.",
    category: "marathi-format",
    tags: ["marathi format", "traditional biodata", "modern biodata"],
    publishedAt: "2024-02-10",
    readTime: 6,
    featured: false,
  },
  {
    slug: "resume-for-freshers-india",
    title: "How to Write a Resume With No Experience (Freshers Guide)",
    description: "A complete guide for college graduates and freshers to create impressive resumes even without work experience. Includes templates and real examples.",
    category: "resume-tips",
    tags: ["fresher resume", "no experience resume", "first job India"],
    publishedAt: "2024-02-15",
    readTime: 6,
    featured: false,
  },
  {
    slug: "job-interview-tips-india",
    title: "15 Job Interview Tips Every Indian Professional Should Know",
    description: "Expert advice on acing job interviews in India. From common questions to salary negotiation tips — everything you need to land your dream job.",
    category: "interview-tips",
    tags: ["interview tips", "job interview India", "salary negotiation"],
    publishedAt: "2024-02-20",
    readTime: 8,
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "biodata-tips": "bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400",
  "resume-tips": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "marriage-biodata": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "interview-tips": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "marathi-format": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.filter(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured);

  return (
    <>
      <StructuredData data={blogSchema} />

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Biodata & Resume Tips Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Expert guides on Marathi biodata format, resume writing, and job interview tips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Ad */}
        <AdBanner slot="8901234567" format="horizontal" className="mb-8" />

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <span key={cat.id} className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gold-100 dark:hover:bg-gold-900/30 hover:text-gold-700 dark:hover:text-gold-400 transition-colors">
              {cat.label}
            </span>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-border hover:border-gold-400 transition-all duration-200 hover:shadow-md overflow-hidden h-full">
                <div className="h-44 bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/20 dark:to-gold-800/10 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
                <div className="p-5">
                  <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {CATEGORIES.find(c => c.id === post.category)?.label}
                  </div>
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
                    </div>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mid Ad */}
        <AdBanner slot="9012345678" format="horizontal" className="mb-10" />

        {/* More Posts */}
        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-5">More Articles</h2>
        <div className="space-y-4">
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-border hover:border-gold-400 transition-all duration-200 p-5 flex items-start gap-5">
                <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-2xl">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {CATEGORIES.find(c => c.id === post.category)?.label}
                  </div>
                  <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors mb-1 line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1">{post.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                    <span>{post.publishedAt}</span>
                    <span className="flex items-center gap-0.5 text-gold-600 dark:text-gold-400 font-medium group-hover:gap-1 transition-all">Read more <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <AdBanner slot="0123456789" format="horizontal" className="mt-10" />
      </div>
    </>
  );
}
