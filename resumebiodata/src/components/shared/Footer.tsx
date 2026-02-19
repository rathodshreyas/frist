import Link from "next/link";
import { FileText, ScrollText, BookOpen, Info, Phone, Shield, FileCheck, Mail } from "lucide-react";

const footerLinks = {
  tools: [
    { label: "Marathi Biodata Maker", href: "/biodata", icon: FileText },
    { label: "Resume Builder", href: "/resume", icon: ScrollText },
    { label: "Blog & Tips", href: "/blog", icon: BookOpen },
  ],
  blog: [
    { label: "Biodata Tips", href: "/blog?category=biodata-tips" },
    { label: "Resume Writing Tips", href: "/blog?category=resume-tips" },
    { label: "Marathi Biodata Format", href: "/blog/perfect-marathi-biodata-format-2024" },
    { label: "Interview Tips", href: "/blog?category=interview-tips" },
    { label: "ATS Resume Guide", href: "/blog/ats-friendly-resume-guide-india" },
  ],
  company: [
    { label: "About Us", href: "/about", icon: Info },
    { label: "Contact Us", href: "/contact", icon: Phone },
    { label: "Privacy Policy", href: "/privacy-policy", icon: Shield },
    { label: "Terms & Conditions", href: "/terms", icon: FileCheck },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-white text-base">R</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">
                  ResumeBiodata<span className="text-gold-400">.in</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              India&apos;s free Marathi biodata and professional resume maker. Create HD PDF in minutes.
            </p>
            <p className="marathi text-sm text-gold-400">
              मोफत मराठी बायोडेटा आणि रेझ्युमे निर्माता
            </p>
            <div className="mt-4">
              <a
                href="mailto:contact@resumebiodata.in"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@resumebiodata.in
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors group"
                  >
                    <link.icon className="w-3.5 h-3.5 group-hover:text-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Helpful Guides
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.blog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors group"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ResumeBiodata.in. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <span>✓ Free to use</span>
              <span>✓ No registration</span>
              <span>✓ No watermarks</span>
              <span>✓ HD PDF</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
