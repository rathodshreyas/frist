"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageSquare, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">Have a question? We'd love to help. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-cream-50 dark:bg-neutral-900 border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">contact@resumebiodata.in</div>
              </div>
            </div>
          </div>

          <div className="bg-cream-50 dark:bg-neutral-900 border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Response Time</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Within 24 business hours</div>
              </div>
            </div>
          </div>

          <div className="bg-gold-50 dark:bg-gold-900/10 border border-gold-200 dark:border-gold-800 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Common Topics</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• PDF download issues</li>
              <li>• Template customization requests</li>
              <li>• Advertising & partnerships</li>
              <li>• Privacy concerns</li>
              <li>• Feature suggestions</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
            <input
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-border rounded-xl bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-border rounded-xl bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
            <input
              value={form.subject}
              onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="What's this about?"
              className="w-full px-4 py-3 border border-border rounded-xl bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
            <textarea
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              rows={5}
              placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 border border-border rounded-xl bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 py-3.5 gold-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-60"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
