import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Tag, FileText, ScrollText } from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import AdBanner from "@/components/shared/AdBanner";
import StructuredData from "@/components/shared/StructuredData";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `https://resumebiodata.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    alternates: { canonical: `https://resumebiodata.in/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) { elements.push(<br key={key++} />); continue; }

      if (line.startsWith("## ")) {
        elements.push(<h2 key={key++} className="text-2xl font-display font-bold text-foreground mt-8 mb-4">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={key++} className="text-xl font-display font-semibold text-foreground mt-6 mb-3">{line.slice(4)}</h3>);
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        elements.push(
          <li key={key++} className="text-foreground leading-relaxed ml-4 mb-1 list-disc">
            {renderInline(line.slice(2))}
          </li>
        );
      } else if (/^\d+\./.test(line)) {
        elements.push(
          <li key={key++} className="text-foreground leading-relaxed ml-4 mb-1 list-decimal">
            {renderInline(line.replace(/^\d+\.\s/, ""))}
          </li>
        );
      } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        elements.push(<p key={key++} className="font-bold text-foreground mb-2">{line.slice(2, -2)}</p>);
      } else {
        elements.push(<p key={key++} className="text-foreground leading-relaxed mb-3">{renderInline(line)}</p>);
      }
    }
    return elements;
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "ResumeBiodata.in",
      logo: { "@type": "ImageObject", url: "https://resumebiodata.in/logo.png" },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://resumebiodata.in/blog/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <StructuredData data={articleSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-3 py-1 rounded-full font-medium capitalize">
                  {post.category.replace(/-/g, " ")}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime} min read
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              {post.titleMarathi && (
                <p className="marathi text-lg text-gold-600 dark:text-gold-400">
                  {post.titleMarathi}
                </p>
              )}

              <p className="text-muted-foreground text-lg leading-relaxed mt-3">
                {post.description}
              </p>
            </div>

            {/* Ad before content */}
            <div className="mb-6">
              <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE || "2345678901"} format="horizontal" />
            </div>

            {/* Content */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 prose-content text-[15px] leading-relaxed">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200 dark:border-amber-700/30 rounded-2xl p-6 text-center">
              <div className="marathi text-gold-600 text-xl mb-2">॥ श्री गणेशाय नमः ॥</div>
              <h3 className="font-display font-bold text-foreground text-xl mb-2">
                Ready to Create Your {post.category.includes("resume") ? "Resume" : "Biodata"}?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Free HD PDF download — no registration required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/biodata" className="btn-gold inline-flex items-center gap-2 justify-center py-3 px-6 rounded-xl">
                  <FileText className="w-4 h-4" /> Create Biodata Free
                </Link>
                <Link href="/resume" className="btn-outline-gold inline-flex items-center gap-2 justify-center py-3 px-6 rounded-xl">
                  <ScrollText className="w-4 h-4" /> Build Resume Free
                </Link>
              </div>
            </div>

            {/* Bottom ad */}
            <div className="mt-6">
              <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "3456789012"} format="horizontal" />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="sticky top-20 space-y-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/biodata" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <FileText className="w-4 h-4 text-primary" /> Biodata Maker
                  </Link>
                  <Link href="/resume" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <ScrollText className="w-4 h-4 text-primary" /> Resume Builder
                  </Link>
                </div>
              </div>

              <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "4567890123"} format="rectangle" />

              {relatedPosts.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug">
                        → {rp.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
