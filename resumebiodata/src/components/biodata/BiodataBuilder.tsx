"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  Download, Eye, Upload, Lock, Star, X, Loader2,
  ChevronDown, ChevronUp, RefreshCw, Info, Sparkles
} from "lucide-react";
import { BiodataFormData, BiodataTemplate } from "@/types";
import { compressImage, cropImageToFace, generateId } from "@/lib/utils";

// Template definitions
const TEMPLATES: BiodataTemplate[] = [
  {
    id: "ganpati-classic",
    name: "Ganpati Classic",
    nameMarathi: "गणपती क्लासिक",
    description: "Traditional with Ganpati header and gold double border",
    preview: "🙏",
    isPremium: false,
    category: "traditional",
    colors: { primary: "#b45309", secondary: "#fffdf0", accent: "#f59e0b", text: "#2d1a00" },
    features: ["Ganpati Header", "Gold Border", "Traditional Layout", "Devanagari Font"],
  },
  {
    id: "royal-lotus",
    name: "Royal Lotus",
    nameMarathi: "रॉयल लोटस",
    description: "Royal maroon header with professional layout",
    preview: "🏮",
    isPremium: false,
    category: "royal",
    colors: { primary: "#7c2d12", secondary: "#fff8f0", accent: "#d97706", text: "#1a0800" },
    features: ["Royal Header", "Maroon Theme", "Right-side Photo", "Two-tone Design"],
  },
  {
    id: "premium-mandala",
    name: "Mandala Premium",
    nameMarathi: "मंडला प्रीमियम",
    description: "Intricate mandala patterns with premium gold design",
    preview: "🌸",
    isPremium: true,
    price: 49,
    category: "traditional",
    colors: { primary: "#b45309", secondary: "#fffbeb", accent: "#f59e0b", text: "#1a0800" },
    features: ["Mandala Pattern", "Premium Design", "HD Quality", "Print Optimized"],
  },
  {
    id: "premium-floral",
    name: "Floral Elegance",
    nameMarathi: "फुलांची रचना",
    description: "Delicate floral borders with cream and gold elegance",
    preview: "🌺",
    isPremium: true,
    price: 49,
    category: "modern",
    colors: { primary: "#9a3412", secondary: "#fffbf5", accent: "#f97316", text: "#1a0800" },
    features: ["Floral Borders", "Elegant Design", "Cream Theme", "Modern Touch"],
  },
];

const INITIAL_DATA: BiodataFormData = {
  naam: "", janmTarikh: "", janmVel: "", janmThikan: "",
  unchi: "", vajan: "", rang: "", rashi: "", nakshatra: "",
  shikshan: "", vyavsay: "", varsikUtpanna: "", naukri: "",
  gotra: "", kul: "", mamaAdnav: "", vadilanchNaav: "", vadilVyavsay: "",
  aaiChNaav: "", bhawaCount: "", baheenCount: "",
  patta: "", samparkKramank: "", email: "", itarMahiti: "", expectations: "",
  language: "marathi", template: "ganpati-classic",
};

type FormSection = "personal" | "career" | "family" | "contact" | "other";

export default function BiodataBuilder() {
  const [formData, setFormData] = useState<BiodataFormData>(INITIAL_DATA);
  const [activeSection, setActiveSection] = useState<FormSection>("personal");
  const [downloading, setDownloading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [premiumToken, setPremiumToken] = useState<string>("");

  const update = (field: keyof BiodataFormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const setTemplate = (id: string) =>
    setFormData((prev) => ({ ...prev, template: id }));

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      toast.error("Image size must be less than 6MB");
      return;
    }

    setPhotoLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const raw = e.target?.result as string;
        const cropped = await cropImageToFace(raw);
        const compressed = await compressImage(cropped, 350, 440, 0.88);
        setFormData((prev) => ({ ...prev, photo: compressed }));
        toast.success("Photo uploaded and optimized!");
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to process image");
    } finally {
      setPhotoLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
  });

  const handleDownload = async () => {
    if (!formData.naam.trim()) {
      toast.error("Please enter your name (नाव) to continue");
      return;
    }

    setDownloading(true);
    try {
      const res = await fetch("/api/download-biodata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(premiumToken ? { "x-premium-token": premiumToken } : {}),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        if (err.code === "PREMIUM_REQUIRED") {
          toast.error("This is a premium template. Please unlock it first.");
          return;
        }
        throw new Error(err.error || "Download failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.naam || "biodata"}_biodata.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("🎉 Biodata downloaded successfully!");
    } catch (error) {
      toast.error((error as Error).message || "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all form data? This cannot be undone.")) {
      setFormData(INITIAL_DATA);
      toast.success("Form reset");
    }
  };

  const sections: { id: FormSection; label: string; marathi: string; progress: number }[] = [
    {
      id: "personal", label: "Personal Details", marathi: "वैयक्तिक माहिती",
      progress: [formData.naam, formData.janmTarikh, formData.janmThikan, formData.unchi].filter(Boolean).length / 4 * 100,
    },
    {
      id: "career", label: "Education & Career", marathi: "शिक्षण व व्यवसाय",
      progress: [formData.shikshan, formData.vyavsay].filter(Boolean).length / 2 * 100,
    },
    {
      id: "family", label: "Family Details", marathi: "कौटुंबिक माहिती",
      progress: [formData.vadilanchNaav, formData.aaiChNaav, formData.gotra].filter(Boolean).length / 3 * 100,
    },
    {
      id: "contact", label: "Contact Info", marathi: "संपर्क माहिती",
      progress: [formData.samparkKramank, formData.patta].filter(Boolean).length / 2 * 100,
    },
    {
      id: "other", label: "Photo & Other", marathi: "फोटो व इतर",
      progress: formData.photo ? 100 : 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="templates">

        {/* ===== LEFT: FORM ===== */}
        <div className="lg:col-span-2 space-y-5">

          {/* Template Selector */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Choose Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    if (tpl.isPremium && !premiumToken) {
                      toast.info(`"${tpl.name}" is a premium template. Unlock for ₹49`);
                      return;
                    }
                    setTemplate(tpl.id);
                  }}
                  className={`relative group p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                    formData.template === tpl.id
                      ? "border-primary bg-primary/5 shadow-gold"
                      : "border-border hover:border-primary/50"
                  }`}
                  aria-label={`Select ${tpl.name} template${tpl.isPremium ? " (Premium)" : " (Free)"}`}
                  aria-pressed={formData.template === tpl.id}
                >
                  {tpl.isPremium && (
                    <div className="absolute top-1.5 right-1.5 bg-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> ₹49
                    </div>
                  )}
                  {!tpl.isPremium && (
                    <div className="absolute top-1.5 right-1.5 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Free
                    </div>
                  )}
                  <div className="text-3xl mb-2">{tpl.preview}</div>
                  <div className="text-xs font-semibold text-foreground">{tpl.name}</div>
                  <div className="marathi text-[10px] text-muted-foreground">{tpl.nameMarathi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm text-foreground">Language / भाषा</label>
              <div className="flex items-center gap-2">
                {(["marathi", "english", "bilingual"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => update("language", lang)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      formData.language === lang
                        ? "gold-gradient text-white shadow-gold"
                        : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                    }`}
                  >
                    {lang === "marathi" ? "मराठी" : lang === "english" ? "English" : "Both"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Sections - Accordion */}
          {sections.map((sec) => (
            <div key={sec.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === sec.id ? "personal" : sec.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors group"
                aria-expanded={activeSection === sec.id}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {sec.progress === 100 ? "✓" : Math.round(sec.progress) + "%"}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-sm">{sec.label}</div>
                    <div className="marathi text-xs text-muted-foreground">{sec.marathi}</div>
                  </div>
                </div>
                {activeSection === sec.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {activeSection === sec.id && (
                <div className="border-t border-border p-5 animate-slide-down">
                  {sec.id === "personal" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="नाव (Name)" value={formData.naam} onChange={(v) => update("naam", v)} placeholder="पूर्ण नाव" required />
                      <Field label="जन्म तारीख (Date of Birth)" value={formData.janmTarikh} onChange={(v) => update("janmTarikh", v)} placeholder="उदा. १५ ऑगस्ट १९९५" />
                      <Field label="जन्म वेळ (Birth Time)" value={formData.janmVel} onChange={(v) => update("janmVel", v)} placeholder="उदा. सकाळी ८:३०" />
                      <Field label="जन्म ठिकाण (Birth Place)" value={formData.janmThikan} onChange={(v) => update("janmThikan", v)} placeholder="शहर/गाव, जिल्हा" />
                      <Field label="उंची (Height)" value={formData.unchi} onChange={(v) => update("unchi", v)} placeholder="उदा. ५ फूट ६ इंच / १६७ सेमी" />
                      <Field label="रंग (Complexion)" value={formData.rang} onChange={(v) => update("rang", v)} placeholder="उदा. गोरा, सावळा" />
                      <Field label="राशी (Rashi)" value={formData.rashi} onChange={(v) => update("rashi", v)} placeholder="उदा. मेष, वृषभ" />
                      <Field label="नक्षत्र (Nakshatra)" value={formData.nakshatra} onChange={(v) => update("nakshatra", v)} placeholder="उदा. रोहिणी, अश्विनी" />
                    </div>
                  )}

                  {sec.id === "career" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Field label="शिक्षण (Education)" value={formData.shikshan} onChange={(v) => update("shikshan", v)} placeholder="उदा. B.E. Computer, Pune University, 2020" />
                      </div>
                      <Field label="व्यवसाय (Occupation)" value={formData.vyavsay} onChange={(v) => update("vyavsay", v)} placeholder="उदा. Software Engineer" />
                      <Field label="वार्षिक उत्पन्न (Annual Income)" value={formData.varsikUtpanna} onChange={(v) => update("varsikUtpanna", v)} placeholder="उदा. ₹ ८-१० लाख" />
                      <div className="sm:col-span-2">
                        <Field label="नोकरी ठिकाण (Work Place)" value={formData.naukri} onChange={(v) => update("naukri", v)} placeholder="उदा. Infosys, Pune" />
                      </div>
                    </div>
                  )}

                  {sec.id === "family" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="गोत्र (Gotra)" value={formData.gotra} onChange={(v) => update("gotra", v)} placeholder="उदा. कश्यप, भारद्वाज" />
                      <Field label="कुल (Kul)" value={formData.kul} onChange={(v) => update("kul", v)} placeholder="उदा. देशस्थ, कोकणस्थ" />
                      <Field label="मामा आडनाव (Mama's Surname)" value={formData.mamaAdnav} onChange={(v) => update("mamaAdnav", v)} placeholder="आईच्या माहेरचे आडनाव" />
                      <Field label="वडिलांचे नाव (Father's Name)" value={formData.vadilanchNaav} onChange={(v) => update("vadilanchNaav", v)} placeholder="वडिलांचे पूर्ण नाव" />
                      <Field label="वडिलांचा व्यवसाय (Father's Job)" value={formData.vadilVyavsay} onChange={(v) => update("vadilVyavsay", v)} placeholder="उदा. शेतकरी, व्यापारी" />
                      <Field label="आईचे नाव (Mother's Name)" value={formData.aaiChNaav} onChange={(v) => update("aaiChNaav", v)} placeholder="आईचे पूर्ण नाव" />
                      <Field label="भाऊ (Brothers)" value={formData.bhawaCount} onChange={(v) => update("bhawaCount", v)} placeholder="उदा. २ (१ विवाहित, १ अविवाहित)" />
                      <Field label="बहीण (Sisters)" value={formData.baheenCount} onChange={(v) => update("baheenCount", v)} placeholder="उदा. १ (विवाहित)" />
                    </div>
                  )}

                  {sec.id === "contact" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="form-label marathi">पत्ता (Address)</label>
                        <textarea
                          value={formData.patta}
                          onChange={(e) => update("patta", e.target.value)}
                          rows={3}
                          placeholder="पूर्ण घराचा पत्ता, शहर, पिन कोड..."
                          className="form-input marathi resize-none"
                          aria-label="Address"
                        />
                      </div>
                      <Field label="संपर्क क्रमांक (Phone)" value={formData.samparkKramank} onChange={(v) => update("samparkKramank", v)} placeholder="+91 98765 43210" type="tel" />
                      <Field label="Email (ईमेल)" value={formData.email} onChange={(v) => update("email", v)} placeholder="example@email.com" type="email" />
                    </div>
                  )}

                  {sec.id === "other" && (
                    <div className="space-y-5">
                      {/* Photo Upload */}
                      <div>
                        <label className="form-label">फोटो (Photo)</label>
                        <div className="flex gap-4 flex-col sm:flex-row items-start">
                          <div
                            {...getRootProps()}
                            className={`flex-1 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                              isDragActive
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/60 hover:bg-muted/30"
                            }`}
                            aria-label="Upload photo"
                          >
                            <input {...getInputProps()} />
                            {photoLoading ? (
                              <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                <p className="text-xs text-muted-foreground">Processing image...</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <p className="text-sm font-medium text-foreground">
                                  {isDragActive ? "Drop here!" : "Drag & drop or click to upload"}
                                </p>
                                <p className="text-xs text-muted-foreground">JPG, PNG, WEBP up to 6MB</p>
                                <p className="text-xs text-muted-foreground">Auto face-center crop applied</p>
                              </div>
                            )}
                          </div>

                          {formData.photo && (
                            <div className="relative flex-shrink-0">
                              <img
                                src={formData.photo}
                                alt="Uploaded photo preview"
                                className="w-28 h-36 object-cover rounded-xl border-2 border-border shadow-md"
                              />
                              <button
                                onClick={() => update("photo", "")}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors shadow"
                                aria-label="Remove photo"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Other Info */}
                      <div>
                        <label className="form-label marathi">इतर माहिती (Other Information)</label>
                        <textarea
                          value={formData.itarMahiti}
                          onChange={(e) => update("itarMahiti", e.target.value)}
                          rows={4}
                          placeholder="आवड-निवड, छंद, कोणतीही महत्त्वाची माहिती..."
                          className="form-input marathi resize-none"
                          aria-label="Other information"
                        />
                      </div>

                      <div>
                        <label className="form-label marathi">अपेक्षा (Expectations - Optional)</label>
                        <textarea
                          value={formData.expectations}
                          onChange={(e) => update("expectations", e.target.value)}
                          rows={3}
                          placeholder="जीवनसाथीकडून अपेक्षा..."
                          className="form-input marathi resize-none"
                          aria-label="Expectations"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Reset Form
            </button>
          </div>
        </div>

        {/* ===== RIGHT: PREVIEW & ACTIONS ===== */}
        <div className="space-y-4">
          <div className="sticky top-20">

            {/* Download Card */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">Your Biodata</h3>
                <p className="text-xs text-muted-foreground">Ready to download as HD PDF</p>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading || !formData.naam.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  !formData.naam.trim()
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "btn-gold"
                }`}
                aria-label="Download biodata PDF"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PDF — Free
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 text-center">
                {["HD Quality", "A4 Size", "No Watermark"].map((badge) => (
                  <div key={badge} className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg py-1.5 px-1 font-medium">
                    ✓ {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Unlock */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h3 className="font-bold text-sm text-foreground">Unlock Premium Templates</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Get access to Mandala and Floral premium designs with intricate patterns and exclusive layouts.
              </p>
              <button
                onClick={() => toast.info("Razorpay integration ready! Add your API keys to enable payments.")}
                className="w-full btn-gold text-sm py-2.5 rounded-xl"
              >
                Unlock All Templates — ₹49
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                One-time payment • Lifetime access
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-foreground">Live Preview</span>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="p-4">
                {/* Mini biodata preview */}
                <div className="rounded-lg border-2 border-amber-300 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 p-3 text-center space-y-1.5">
                  <div className="marathi text-gold-600 dark:text-gold-400 text-xs font-bold">
                    ॥ श्री गणेशाय नमः ॥
                  </div>
                  <div className="text-xs font-display font-bold text-foreground">
                    विवाह बायोडेटा
                  </div>
                  <div className="w-full h-px bg-gold-300 dark:bg-gold-700/50" />
                  {formData.naam && (
                    <div className="marathi text-xs font-semibold text-foreground">{formData.naam}</div>
                  )}
                  {formData.photo && (
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-14 h-18 object-cover rounded mx-auto border border-amber-300"
                    />
                  )}
                  {formData.janmTarikh && (
                    <div className="marathi text-[10px] text-muted-foreground">📅 {formData.janmTarikh}</div>
                  )}
                  {formData.vyavsay && (
                    <div className="marathi text-[10px] text-muted-foreground">💼 {formData.vyavsay}</div>
                  )}
                  {formData.samparkKramank && (
                    <div className="text-[10px] text-muted-foreground">📞 {formData.samparkKramank}</div>
                  )}
                  {!formData.naam && (
                    <p className="text-[10px] text-muted-foreground">Fill in the form to see preview</p>
                  )}
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  Full PDF preview available after download
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Field Component
function Field({
  label, value, onChange, placeholder, required, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="form-label marathi">
        {label} {required && <span className="text-destructive" aria-hidden>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="form-input marathi"
        aria-label={label}
      />
    </div>
  );
}
