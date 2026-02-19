import Link from "next/link";
import { FileText, ScrollText, BookOpen, Shield, Info, Phone, FileCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-neutral-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-white font-bold text-sm">R</div>
              <span className="font-display font-bold text-white text-lg">ResumeBiodata<span className="text-gold-400">.in</span></span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Free Marathi biodata and resume maker. Create HD PDF in minutes.</p>
            <p className="text-sm marathi text-gold-400">मोफत मराठी बायोडेटा व रेझ्युमे निर्माता</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tools</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Marathi Biodata Maker", href: "/biodata", icon: FileText },
                { label: "Resume Builder", href: "/resume", icon: ScrollText },
                { label: "Blog & Tips", href: "/blog", icon: BookOpen },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Blog Topics</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Biodata Tips", href: "/blog?category=biodata-tips" },
                { label: "Resume Writing Tips", href: "/blog?category=resume-tips" },
                { label: "Marriage Biodata Format", href: "/blog/marathi-biodata-format" },
                { label: "Job Interview Tips", href: "/blog?category=interview-tips" },
                { label: "Marathi Marriage Format", href: "/blog/marathi-marriage-format" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Pages */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about", icon: Info },
                { label: "Contact Us", href: "/contact", icon: Phone },
                { label: "Privacy Policy", href: "/privacy-policy", icon: Shield },
                { label: "Terms & Conditions", href: "/terms", icon: FileCheck },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ResumeBiodata.in. All rights reserved. Made with ❤️ in India.
          </p>
          <p className="text-xs text-gray-600">
            Free to use • No registration required • No watermarks
          </p>
        </div>
      </div>
    </footer>
  );
}
