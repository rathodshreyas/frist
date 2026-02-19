"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll reply within 24-48 hours. 🙏");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Name *</label>
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Your full name" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="your@email.com" className="form-input" required />
        </div>
      </div>
      <div>
        <label className="form-label">Subject</label>
        <input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          placeholder="How can we help?" className="form-input" />
      </div>
      <div>
        <label className="form-label">Message *</label>
        <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          rows={5} placeholder="Your message..." className="form-input resize-none" required />
      </div>
      <button type="submit" disabled={loading}
        className="btn-gold flex items-center gap-2 justify-center w-full py-3 rounded-xl">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
    </form>
  );
}
