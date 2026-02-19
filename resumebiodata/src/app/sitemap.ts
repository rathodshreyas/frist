import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://resumebiodata.in";
  const now = new Date().toISOString();

  const blogSlugs = [
    "marathi-biodata-format",
    "ats-friendly-resume-india",
    "biodata-mistakes-to-avoid",
    "marathi-marriage-format",
    "resume-for-freshers-india",
    "job-interview-tips-india",
  ];

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/biodata`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...blogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
