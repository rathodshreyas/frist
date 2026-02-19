import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { truncate, formatDate } from "@/lib/utils";
import AdBanner from "@/components/shared/AdBanner";

export const metadata: Metadata = {
  title: "Blog — Biodata & Resume Tips | ResumeBiodata.in",
  description:
    "Expert tips on Marathi biodata format, resume writing, interview preparation, and career advice for Indian job seekers.",
  alternates: { canonical: "https://resumebiodata.in/blog" },
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category || "all";
  const posts =
    active === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">
          Expert Guides & Tips
        </h1>
        <p className="text-muted-foreground text-lg">
          Biodata format, resume writing, and career advice for India
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {blogCategories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === "all" ? "/blog" : `/blog?category=${cat.id}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat.id
                ? "gold-gradient text-white shadow-gold"
                : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 mb-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1234567890"} format="horizontal" />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
          >
            <div className="h-40 bg-gradient-to-br from-gold-100 to-amber-50 dark:from-gold-900/20 dark:to-amber-900/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gold-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full font-medium capitalize">
                  {post.category.replace(/-/g, " ")}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime} min
                </span>
              </div>
              <h2 className="font-display font-semibold text-foreground text-lg leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {truncate(post.description, 110)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No posts in this category yet.</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 mt-10">
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "3456789012"} format="horizontal" />
      </div>
    </div>
  );
}
