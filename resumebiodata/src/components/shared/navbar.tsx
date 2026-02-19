"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, FileText, ScrollText, BookOpen, Lock } from "lucide-react";

const navLinks = [
  { label: "Biodata Maker", href: "/biodata", icon: FileText },
  { label: "Resume Builder", href: "/resume", icon: ScrollText },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-white font-bold text-sm font-display">R</div>
            <div>
              <span className="font-display font-bold text-gray-900 dark:text-white text-lg leading-none">ResumeBiodata</span>
              <span className="text-gold-600 dark:text-gold-400 font-bold text-lg">.in</span>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-none marathi">मोफत बायोडेटा व रेझ्युमे</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <Sun className="w-5 h-5 hidden dark:block" />
              <Moon className="w-5 h-5 dark:hidden" />
            </button>

            {/* Premium CTA */}
            <Link
              href="/biodata#templates"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 gold-gradient text-white text-sm font-semibold rounded-lg hover:shadow-md hover:shadow-gold-500/30 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              Premium
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white dark:bg-neutral-950 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:text-gold-600 dark:hover:text-gold-400 transition-all"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/biodata#templates"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl gold-gradient text-white font-semibold"
            >
              <Lock className="w-5 h-5" />
              Unlock Premium Templates
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
