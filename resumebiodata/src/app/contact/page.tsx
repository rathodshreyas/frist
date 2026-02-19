import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ResumeBiodata.in",
  description: "Contact ResumeBiodata.in for support, feedback, or partnership enquiries.",
  alternates: { canonical: "https://resumebiodata.in/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground text-lg">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-5">
          {[
            { icon: Mail, title: "Email", value: "contact@resumebiodata.in", href: "mailto:contact@resumebiodata.in" },
            { icon: MapPin, title: "Location", value: "Maharashtra, India" },
            { icon: Clock, title: "Response Time", value: "Within 24-48 hours" },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 bg-card border border-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.title}</div>
                {item.href
                  ? <a href={item.href} className="text-primary hover:underline font-medium">{item.value}</a>
                  : <div className="font-medium text-foreground">{item.value}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl text-foreground mb-5">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
