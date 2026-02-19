"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Download, Eye, Upload, Lock, Star, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { BiodataFormData, BiodataTemplate } from "@/types";

const TEMPLATES: BiodataTemplate[] = [
  { id: "ganpati", name: "Ganpati Classic", nameMarathi: "गणपती क्लासिक", description: "Traditional Ganpati header with gold border", thumbnail: "🙏", isPremium: false, tags: ["traditional", "marathi"] },
  { id: "traditional", name: "Royal Gold", nameMarathi: "रॉयल गोल्ड", description: "Elegant royal design with ornate borders", thumbnail: "👑", isPremium: false, tags: ["traditional"] },
  { id: "modern", name: "Modern Minimal", nameMarathi: "मॉडर्न", description: "Clean modern layout with subtle gold accents", thumbnail: "✨", isPremium: true, tags: ["modern"] },
  { id: "floral", name: "Floral Delight", nameMarathi: "फुलांची रचना", description: "Beautiful floral pattern border design", thumbnail: "🌸", isPremium: true, tags: ["traditional", "floral"] },
];

const defaultData: BiodataFormData = {
  naam: "", janmTarikh: "", janmVel: "", janmThikan: "", unchi: "", rang: "",
  shikshan: "", vyavsay: "", varsikUtpanna: "", gotra: "", mamaAdnav: "",
  vadilanchNaav: "", vadilVyavsay: "", aaiChNaav: "", bhawaLagna: "", baheenLagna: "",
  patta: "", samparkKramank: "", email: "", itarMahiti: "", language: "marathi",
};

type Section = "personal" | "career" | "family" | "contact" | "other";

export default function BiodataBuilder() {
  const [data, setData] = useState<BiodataFormData>(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState("ganpati");
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [downloading, setDownloading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const updateField = (field: keyof BiodataFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = Math.min(img.width, img.height);
        canvas.width = 300; canvas.height = 360;
        const ctx = canvas.getContext("2d")!;
        const sx = (img.width - size) / 2, sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size * 1.2, 0, 0, 300, 360);
        setData(prev => ({ ...prev, photo: canvas.toDataURL("image/jpeg", 0.85) }));
        toast.success("Photo uploaded successfully!");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] }, maxFiles: 1,
  });

  const handleDownload = async () => {
    if (!data.naam) { toast.error("Please enter your name first"); return; }
    setDownloading(true);
    try {
      const res = await fetch("/api/download-biodata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, templateId: selectedTemplate }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${data.naam}_Biodata.pdf`; a.click();
      URL.revokeObjectURL(url);
      toast.success("🎉 Biodata downloaded successfully!");
    } catch (e) {
      toast.error((e as Error).message || "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const sections: { id: Section; label: string; marathiLabel: string; fields: React.ReactNode }[] = [
    {
      id: "personal", label: "Personal Details", marathiLabel: "वैयक्तिक माहिती",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput label="नाव (Name)" value={data.naam} onChange={v => updateField("naam", v)} placeholder="पूर्ण नाव" required />
          <FieldInput label="जन्म तारीख (Date of Birth)" value={data.janmTarikh} onChange={v => updateField("janmTarikh", v)} placeholder="उदा. १५ ऑगस्ट १९९५" />
          <FieldInput label="जन्म वेळ (Birth Time)" value={data.janmVel} onChange={v => updateField("janmVel", v)} placeholder="उदा. सकाळी ८:३०" />
          <FieldInput label="जन्म ठिकाण (Birth Place)" value={data.janmThikan} onChange={v => updateField("janmThikan", v)} placeholder="शहर/गाव" />
          <FieldInput label="उंची (Height)" value={data.unchi} onChange={v => updateField("unchi", v)} placeholder="उदा. ५ फूट ६ इंच" />
          <FieldInput label="रंग (Complexion)" value={data.rang} onChange={v => updateField("rang", v)} placeholder="उदा. गोरा, सावळा" />
        </div>
      )
    },
    {
      id: "career", label: "Education & Career", marathiLabel: "शिक्षण व व्यवसाय",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FieldInput label="शिक्षण (Education)" value={data.shikshan} onChange={v => updateField("shikshan", v)} placeholder="उदा. B.E. Computer, Pune University" />
          </div>
          <FieldInput label="व्यवसाय (Occupation)" value={data.vyavsay} onChange={v => updateField("vyavsay", v)} placeholder="उदा. Software Engineer" />
          <FieldInput label="वार्षिक उत्पन्न (Annual Income)" value={data.varsikUtpanna} onChange={v => updateField("varsikUtpanna", v)} placeholder="उदा. ₹ ८ लाख" />
        </div>
      )
    },
    {
      id: "family", label: "Family Details", marathiLabel: "कौटुंबिक माहिती",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput label="गोत्र (Gotra)" value={data.gotra} onChange={v => updateField("gotra", v)} placeholder="उदा. कश्यप" />
          <FieldInput label="मामा आडनाव (Mama's Surname)" value={data.mamaAdnav} onChange={v => updateField("mamaAdnav", v)} placeholder="उदा. कुलकर्णी" />
          <FieldInput label="वडिलांचे नाव (Father's Name)" value={data.vadilanchNaav} onChange={v => updateField("vadilanchNaav", v)} placeholder="वडिलांचे पूर्ण नाव" />
          <FieldInput label="वडिलांचा व्यवसाय (Father's Job)" value={data.vadilVyavsay} onChange={v => updateField("vadilVyavsay", v)} placeholder="उदा. शेतकरी, व्यापारी" />
          <FieldInput label="आईचे नाव (Mother's Name)" value={data.aaiChNaav} onChange={v => updateField("aaiChNaav", v)} placeholder="आईचे पूर्ण नाव" />
          <FieldInput label="भाऊ (Brothers)" value={data.bhawaLagna} onChange={v => updateField("bhawaLagna", v)} placeholder="उदा. २ (१ विवाहित)" />
          <FieldInput label="बहीण (Sisters)" value={data.baheenLagna} onChange={v => updateField("baheenLagna", v)} placeholder="उदा. १ (विवाहित)" />
        </div>
      )
    },
    {
      id: "contact", label: "Contact Details", marathiLabel: "संपर्क माहिती",
      fields: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 marathi">पत्ता (Address)</label>
            <textarea
              value={data.patta}
              onChange={e => updateField("patta", e.target.value)}
              rows={3}
              placeholder="पूर्ण पत्ता"
              className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none text-sm marathi"
            />
          </div>
          <FieldInput label="संपर्क क्रमांक (Phone)" value={data.samparkKramank} onChange={v => updateField("samparkKramank", v)} placeholder="+91 98765 43210" type="tel" />
          <FieldInput label="Email" value={data.email} onChange={v => updateField("email", v)} placeholder="example@email.com" type="email" />
        </div>
      )
    },
    {
      id: "other", label: "Other Info & Photo", marathiLabel: "इतर माहिती",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 marathi">इतर माहिती (Other Information)</label>
            <textarea
              value={data.itarMahiti}
              onChange={e => updateField("itarMahiti", e.target.value)}
              rows={4}
              placeholder="कोणतीही इतर महत्त्वाची माहिती..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none text-sm marathi"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">फोटो (Photo)</label>
            <div className="flex gap-4 items-start flex-wrap">
              <div
                {...getRootProps()}
                className={`flex-1 min-w-48 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-gold-500 bg-gold-50 dark:bg-gold-900/20" : "border-border hover:border-gold-400"}`}
              >
                <input {...getInputProps()} />
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDragActive ? "Drop here..." : "Drag & drop or click to upload"}
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
              </div>
              {data.photo && (
                <div className="relative">
                  <img src={data.photo} alt="Preview" className="w-24 h-28 object-cover rounded-lg border border-border" />
                  <button
                    onClick={() => setData(prev => ({ ...prev, photo: undefined }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">भाषा (Language)</label>
            <div className="flex gap-3">
              {(["marathi", "english", "bilingual"] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => updateField("language", lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${data.language === lang ? "gold-gradient text-white" : "border border-border hover:border-gold-400 text-gray-700 dark:text-gray-300"}`}
                >
                  {lang === "bilingual" ? "Bilingual" : lang === "marathi" ? "मराठी" : "English"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-4">

          {/* Template Selector */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border p-5">
            <h2 className="font-display font-semibold text-gray-900 dark:text-white text-lg mb-4" id="templates">
              Choose Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    if (tpl.isPremium) { toast.info("Unlock premium templates for ₹49"); return; }
                    setSelectedTemplate(tpl.id);
                  }}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all ${selectedTemplate === tpl.id ? "border-gold-500 bg-gold-50 dark:bg-gold-900/20" : "border-border hover:border-gold-300"}`}
                >
                  {tpl.isPremium && (
                    <div className="absolute top-1.5 right-1.5 bg-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> PRO
                    </div>
                  )}
                  <div className="text-3xl mb-1.5">{tpl.thumbnail}</div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{tpl.name}</div>
                  <div className="text-[10px] marathi text-gray-500 dark:text-gray-400">{tpl.nameMarathi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Sections (Accordion) */}
          {sections.map(sec => (
            <div key={sec.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === sec.id ? "personal" : sec.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-left">{sec.label}</div>
                  <div className="marathi text-sm text-gold-600 dark:text-gold-400 text-left">{sec.marathiLabel}</div>
                </div>
                {activeSection === sec.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {activeSection === sec.id && (
                <div className="px-5 pb-5 border-t border-border animate-slide-up">
                  <div className="pt-4">{sec.fields}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Sticky Preview & Download */}
        <div className="space-y-4">
          <div className="sticky top-20">
            {/* Actions */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border p-5 space-y-3">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white">Your Biodata</h3>

              <button
                onClick={handleDownload}
                disabled={downloading || !data.naam}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 gold-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {downloading ? "Generating PDF..." : "Download PDF — Free"}
              </button>

              <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                ✓ HD Quality &nbsp;•&nbsp; ✓ A4 Size &nbsp;•&nbsp; ✓ No Watermark
              </div>

              {/* Unlock Premium */}
              <div className="border border-gold-200 dark:border-gold-800 rounded-xl p-4 bg-gold-50 dark:bg-gold-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Unlock Premium</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Get access to all 10+ premium templates with exclusive designs.
                </p>
                <button
                  onClick={() => toast.info("Razorpay payment integration — coming soon!")}
                  className="w-full py-2 text-sm font-semibold border-2 border-gold-500 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-500 hover:text-white transition-colors"
                >
                  Unlock for ₹49 only
                </button>
              </div>
            </div>

            {/* Mini Preview */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Preview</span>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-cream-50 dark:bg-neutral-800 rounded-lg p-4 border border-gold-200 dark:border-gold-800/30 text-center space-y-1">
                  <div className="text-gold-600 dark:text-gold-400 text-lg font-display">॥ श्री गणेशाय नम: ॥</div>
                  <div className="text-sm font-display font-bold text-gray-900 dark:text-white">
                    {data.naam || "आपले नाव"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">विवाह बायोडेटा</div>
                  {data.janmTarikh && <div className="text-xs text-gray-600 dark:text-gray-400">📅 {data.janmTarikh}</div>}
                  {data.vyavsay && <div className="text-xs text-gray-600 dark:text-gray-400">💼 {data.vyavsay}</div>}
                  {data.unchi && <div className="text-xs text-gray-600 dark:text-gray-400">📏 {data.unchi}</div>}
                  {data.photo && <img src={data.photo} alt="" className="w-16 h-20 object-cover rounded mx-auto border border-gold-200 mt-2" />}
                </div>
                <p className="text-xs text-center text-gray-400 mt-3">Full preview in downloaded PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder, required, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 marathi">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm marathi transition-colors"
      />
    </div>
  );
}
