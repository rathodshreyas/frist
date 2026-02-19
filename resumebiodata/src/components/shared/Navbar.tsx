"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  Moon, Sun, Menu, X, FileText, ScrollText, 
  BookOpen, Lock, ChevronDown, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Biodata Maker",
    labelMarathi: "बायोडेटा",
    href: "/biodata",
    icon: FileText,
    description: "Traditional Marathi marriage biodata",
  },
  {
    label: "Resume Builder",
    labelMarathi: "रेझ्युमे",
    href: "/resume",
    icon: ScrollText,
    description: "ATS-friendly professional resume",
  },
  {
    label: "Blog",
    labelMarathi: "ब्लॉग",
    href: "/blog",
    icon: BookOpen,
    description: "Biodata & resume tips",
  },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="ResumeBiodata.in Home">
            <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-all duration-200 group-hover:scale-105">
              <span className="font-display font-bold text-white text-base" aria-hidden>R</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-foreground text-lg tracking-tight">
                Resume<span className="gold-text">Biodata</span>
                <span className="text-muted-foreground text-sm font-normal">.in</span>
              </span>
              <span className="marathi text-[10px] text-muted-foreground leading-none">
                मोफत बायोडेटा व रेझ्युमे
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-150 group"
                title={link.description}
              >
                <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span>{link.label}</span>
                <span className="marathi text-[10px] text-muted-foreground hidden lg:inline opacity-70">
                  ({link.labelMarathi})
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-150"
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4.5 h-4.5" />
                ) : (
                  <Moon className="w-4.5 h-4.5" />
                )}
              </button>
            )}

            {/* Premium CTA */}
            <Link
              href="/biodata#templates"
              className="hidden sm:flex items-center gap-1.5 btn-gold text-sm py-2.5 px-4 rounded-xl"
              aria-label="Unlock premium templates"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Premium</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-down" role="navigation" aria-label="Mobile navigation">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-foreground hover:bg-accent/50 transition-all"
              >
                <link.icon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">{link.label}</div>
                  <div className="marathi text-[11px] text-muted-foreground">{link.labelMarathi}</div>
                </div>
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/biodata#templates"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 btn-gold w-full rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                Unlock Premium Templates — ₹49
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
