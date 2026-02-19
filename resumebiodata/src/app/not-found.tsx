import Link from "next/link";
import { FileText, ScrollText, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="marathi text-gold-500 text-4xl mb-4">४०४</div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Try one of these instead:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-gold inline-flex items-center gap-2 justify-center py-3 px-5 rounded-xl">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link href="/biodata" className="btn-outline-gold inline-flex items-center gap-2 justify-center py-3 px-5 rounded-xl">
            <FileText className="w-4 h-4" /> Biodata Maker
          </Link>
          <Link href="/resume" className="btn-outline-gold inline-flex items-center gap-2 justify-center py-3 px-5 rounded-xl">
            <ScrollText className="w-4 h-4" /> Resume Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
