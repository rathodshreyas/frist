import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import AdBanner from "@/components/shared/ad-banner";
import StructuredData from "@/components/shared/structured-data";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime: number;
}

// Static blog content - in production this would come from CMS/database
const POSTS: Record<string, BlogPost> = {
  "marathi-biodata-format": {
    slug: "marathi-biodata-format",
    title: "Perfect Marathi Marriage Biodata Format 2024 - Complete Guide",
    description: "Learn how to create the perfect Marathi marriage biodata with our step-by-step guide.",
    category: "marriage-biodata",
    tags: ["marathi biodata", "marriage biodata", "biodata format"],
    publishedAt: "2024-01-15",
    author: "ResumeBiodata Team",
    readTime: 5,
    content: `
      <h2>What is a Marathi Marriage Biodata?</h2>
      <p>A Marathi marriage biodata (विवाह बायोडेटा) is a formal document used in the Maharashtrian matrimonial process. It contains detailed information about the prospective bride or groom, helping families make informed decisions.</p>

      <h2>Essential Fields in Marathi Biodata</h2>
      <h3>1. वैयक्तिक माहिती (Personal Information)</h3>
      <ul>
        <li><strong>नाव (Name):</strong> Full name in Marathi and English</li>
        <li><strong>जन्म तारीख (Date of Birth):</strong> In Marathi calendar format</li>
        <li><strong>जन्म वेळ (Birth Time):</strong> Important for horoscope matching</li>
        <li><strong>जन्म ठिकाण (Birth Place):</strong> City and state</li>
        <li><strong>उंची (Height):</strong> In feet and inches</li>
        <li><strong>रंग (Complexion):</strong> Skin tone</li>
      </ul>

      <h3>2. कौटुंबिक माहिती (Family Information)</h3>
      <ul>
        <li><strong>गोत्र (Gotra):</strong> Ancestral lineage</li>
        <li><strong>मामा आडनाव (Mama's Surname):</strong> Maternal uncle's surname</li>
        <li><strong>वडिलांचे नाव (Father's Name):</strong> With occupation</li>
        <li><strong>आईचे नाव (Mother's Name)</strong></li>
        <li>Siblings information</li>
      </ul>

      <h2>Tips for a Perfect Marathi Biodata</h2>
      <ol>
        <li>Always start with "॥ श्री गणेशाय नम: ॥" for auspiciousness</li>
        <li>Keep the language formal and respectful</li>
        <li>Use Devanagari script for Marathi portions</li>
        <li>Include a recent, professional photograph</li>
        <li>Verify all information before printing</li>
        <li>Keep it to one A4 page</li>
      </ol>

      <h2>Common Mistakes to Avoid</h2>
      <p>Many people make these mistakes in their biodata:</p>
      <ul>
        <li>Using an old or informal photograph</li>
        <li>Incorrect gotra information</li>
        <li>Missing contact details</li>
        <li>Spelling errors in names</li>
        <li>Too much or too little information</li>
      </ul>

      <h2>Create Your Biodata Now</h2>
      <p>Use our free Marathi biodata maker to create a beautiful, professional biodata in minutes. Choose from traditional Ganpati designs and download a high-quality PDF instantly.</p>
    `,
  },
  "ats-friendly-resume-india": {
    slug: "ats-friendly-resume-india",
    title: "How to Write an ATS-Friendly Resume for Indian Job Market",
    description: "Everything you need to know about creating resumes that pass ATS filters.",
    category: "resume-tips",
    tags: ["ATS resume", "job search India", "resume writing"],
    publishedAt: "2024-01-20",
    author: "ResumeBiodata Team",
    readTime: 7,
    content: `
      <h2>What is ATS and Why Does It Matter?</h2>
      <p>ATS (Applicant Tracking System) is software used by 99% of Fortune 500 companies and most large Indian corporations to filter resumes before a human ever sees them. If your resume isn't ATS-friendly, it may never reach the hiring manager.</p>

      <h2>How ATS Systems Work</h2>
      <p>ATS software scans your resume for:</p>
      <ul>
        <li>Keywords matching the job description</li>
        <li>Proper formatting and structure</li>
        <li>Standard section headings</li>
        <li>Dates and employment gaps</li>
      </ul>

      <h2>10 Rules for ATS-Friendly Resumes</h2>
      <ol>
        <li><strong>Use Simple Formatting:</strong> Avoid tables, columns, and graphics in the main content</li>
        <li><strong>Standard Fonts:</strong> Use Arial, Calibri, or Times New Roman</li>
        <li><strong>Keywords from Job Description:</strong> Mirror the exact language used</li>
        <li><strong>Standard Section Headings:</strong> Use "Work Experience" not "Career Journey"</li>
        <li><strong>Spell Out Abbreviations:</strong> Write "Master of Business Administration (MBA)"</li>
        <li><strong>Include Dates:</strong> Always include month and year for all positions</li>
        <li><strong>PDF or DOCX:</strong> Submit in the format specified by the employer</li>
        <li><strong>Tailor for Each Job:</strong> Customize keywords for each application</li>
        <li><strong>Quantify Achievements:</strong> "Increased sales by 25%" beats "improved sales"</li>
        <li><strong>Contact Information at Top:</strong> Name, phone, email, LinkedIn</li>
      </ol>

      <h2>Resume Sections for Indian Job Seekers</h2>
      <h3>Essential Sections</h3>
      <ul>
        <li>Contact Information</li>
        <li>Career Objective / Professional Summary</li>
        <li>Education (most recent first)</li>
        <li>Work Experience</li>
        <li>Technical Skills</li>
        <li>Projects (important for freshers)</li>
        <li>Certifications</li>
        <li>Declaration</li>
      </ul>

      <h2>Build Your ATS Resume Now</h2>
      <p>Use our free ATS-friendly resume builder to create a professional resume that passes ATS filters. Download as PDF instantly.</p>
    `,
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      url: `https://resumebiodata.in/blog/${post.slug}`,
    },
    alternates: { canonical: `https://resumebiodata.in/blog/${post.slug}` },
  };
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "ResumeBiodata.in",
      logo: { "@type": "ImageObject", url: "https://resumebiodata.in/logo.png" },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://resumebiodata.in/blog/${post.slug}` },
  };

  return (
    <>
      <StructuredData data={articleSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-gold-600 dark:hover:text-gold-400">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold-600 dark:hover:text-gold-400">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate">{post.title}</span>
        </nav>

        {/* Top Ad */}
        <AdBanner slot="1357924680" format="horizontal" className="mb-8" />

        {/* Article */}
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-1 rounded-full">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-b border-border pb-4">
              <span>By {post.author}</span>
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-display prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-a:text-gold-600 dark:prose-a:text-gold-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Mid Ad */}
          <AdBanner slot="2468013579" format="rectangle" className="my-8" />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
              {post.tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gold-100 dark:hover:bg-gold-900/30 hover:text-gold-600 dark:hover:text-gold-400 px-2.5 py-1 rounded-full transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-10 p-6 bg-gradient-to-r from-gold-50 to-cream-100 dark:from-gold-900/20 dark:to-neutral-900 rounded-2xl border border-gold-200 dark:border-gold-800 text-center">
          <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
            Ready to Create Your {post.category.includes("resume") ? "Resume" : "Biodata"}?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Use our free online maker to create a professional document in minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/biodata" className="px-5 py-2.5 gold-gradient text-white font-semibold rounded-xl hover:shadow-md transition-all">
              Create Biodata
            </Link>
            <Link href="/resume" className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:shadow-md transition-all">
              Build Resume
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        <AdBanner slot="3692581470" format="horizontal" className="mt-8" />
      </div>
    </>
  );
}
