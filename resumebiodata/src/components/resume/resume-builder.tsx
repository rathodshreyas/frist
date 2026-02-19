"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Download, Plus, Trash2, Loader2, Lock, Star } from "lucide-react";
import { ResumeFormData, EducationEntry, ExperienceEntry, SkillCategory } from "@/types";

const RESUME_TEMPLATES = [
  { id: "modern", name: "Modern Dark", description: "Clean dark header, two-column layout", isPremium: false, atsScore: 95 },
  { id: "classic", name: "Classic Professional", description: "Traditional single-column layout", isPremium: false, atsScore: 98 },
  { id: "minimal", name: "Minimal Clean", description: "Ultra-clean minimal design", isPremium: true, atsScore: 92 },
  { id: "corporate", name: "Corporate Blue", description: "Professional blue accent design", isPremium: true, atsScore: 94 },
];

const defaultData: ResumeFormData = {
  personalDetails: { fullName: "", email: "", phone: "", address: "", linkedin: "", github: "", website: "" },
  careerObjective: "",
  education: [{ id: "1", degree: "", institution: "", board: "", year: "", percentage: "" }],
  experience: [],
  skills: [{ id: "1", category: "Technical Skills", skills: [] }],
  projects: [],
  certifications: [],
  declaration: "I hereby declare that all the information mentioned above is true and correct to the best of my knowledge.",
  language: "english",
};

function genId() { return Math.random().toString(36).slice(2, 9); }

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeFormData>(defaultData);
  const [template, setTemplate] = useState("modern");
  const [activeTab, setActiveTab] = useState("personal");
  const [downloading, setDownloading] = useState(false);
  const [skillInput, setSkillInput] = useState<Record<string, string>>({});

  const updatePersonal = (field: string, value: string) =>
    setData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, [field]: value } }));

  const addEducation = () =>
    setData(prev => ({ ...prev, education: [...prev.education, { id: genId(), degree: "", institution: "", board: "", year: "", percentage: "" }] }));

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) =>
    setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const removeEducation = (id: string) =>
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  const addExperience = () =>
    setData(prev => ({ ...prev, experience: [...prev.experience, { id: genId(), company: "", role: "", duration: "", description: "" }] }));

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const removeExperience = (id: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  const addSkillCategory = () =>
    setData(prev => ({ ...prev, skills: [...prev.skills, { id: genId(), category: "Skills", skills: [] }] }));

  const updateSkillCategory = (id: string, field: keyof SkillCategory, value: string | string[]) =>
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, [field]: value } : s) }));

  const addSkill = (catId: string) => {
    const val = skillInput[catId]?.trim();
    if (!val) return;
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === catId ? { ...s, skills: [...s.skills, val] } : s) }));
    setSkillInput(prev => ({ ...prev, [catId]: "" }));
  };

  const removeSkill = (catId: string, skill: string) =>
    setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === catId ? { ...s, skills: s.skills.filter(sk => sk !== skill) } : s) }));

  const handleDownload = async () => {
    if (!data.personalDetails.fullName) { toast.error("Please enter your full name"); return; }
    setDownloading(true);
    try {
      const res = await fetch("/api/download-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, templateId: template }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${data.personalDetails.fullName}_Resume.pdf`; a.click();
      URL.revokeObjectURL(url);
      toast.success("🎉 Resume downloaded successfully!");
    } catch (e) {
      toast.error((e as Error).message || "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "objective", label: "Objective" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "extras", label: "Extras" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="lg:col-span-2 space-y-4">

          {/* Template Picker */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border p-5">
            <h2 className="font-display font-semibold text-gray-900 dark:text-white text-lg mb-4">Choose Template</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RESUME_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    if (tpl.isPremium) { toast.info("Unlock premium templates for ₹49"); return; }
                    setTemplate(tpl.id);
                  }}
                  className={`relative p-3 rounded-xl border-2 text-left transition-all ${template === tpl.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:border-blue-300"}`}
                >
                  {tpl.isPremium && (
                    <div className="absolute top-1.5 right-1.5 bg-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> PRO
                    </div>
                  )}
                  <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">{tpl.name}</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">{tpl.description}</div>
                  <div className="text-[10px] font-semibold text-green-600 dark:text-green-400">ATS: {tpl.atsScore}%</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border overflow-hidden">
            <div className="flex overflow-x-auto border-b border-border">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* Personal */}
              {activeTab === "personal" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" value={data.personalDetails.fullName} onChange={v => updatePersonal("fullName", v)} placeholder="John Doe" />
                  <Field label="Email *" value={data.personalDetails.email} onChange={v => updatePersonal("email", v)} placeholder="john@example.com" type="email" />
                  <Field label="Phone *" value={data.personalDetails.phone} onChange={v => updatePersonal("phone", v)} placeholder="+91 98765 43210" type="tel" />
                  <Field label="Address" value={data.personalDetails.address} onChange={v => updatePersonal("address", v)} placeholder="City, State" />
                  <Field label="LinkedIn" value={data.personalDetails.linkedin || ""} onChange={v => updatePersonal("linkedin", v)} placeholder="linkedin.com/in/..." />
                  <Field label="GitHub" value={data.personalDetails.github || ""} onChange={v => updatePersonal("github", v)} placeholder="github.com/..." />
                  <div className="sm:col-span-2">
                    <Field label="Portfolio Website" value={data.personalDetails.website || ""} onChange={v => updatePersonal("website", v)} placeholder="https://yoursite.com" />
                  </div>
                </div>
              )}

              {/* Career Objective */}
              {activeTab === "objective" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Career Objective</label>
                  <textarea
                    value={data.careerObjective}
                    onChange={e => setData(prev => ({ ...prev, careerObjective: e.target.value }))}
                    rows={5}
                    placeholder="A motivated professional seeking to leverage skills in..."
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Tip: Keep it 2-3 sentences. Mention role, skills, and what you bring to the company.</p>
                </div>
              )}

              {/* Education */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 border border-border rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Education #{idx + 1}</span>
                        {data.education.length > 1 && (
                          <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Degree/Course" value={edu.degree} onChange={v => updateEducation(edu.id, "degree", v)} placeholder="B.E. Computer Engineering" />
                        <Field label="Institution" value={edu.institution} onChange={v => updateEducation(edu.id, "institution", v)} placeholder="ABC College, Pune" />
                        <Field label="Board/University" value={edu.board} onChange={v => updateEducation(edu.id, "board", v)} placeholder="Pune University" />
                        <Field label="Year of Passing" value={edu.year} onChange={v => updateEducation(edu.id, "year", v)} placeholder="2023" />
                        <Field label="Percentage/CGPA" value={edu.percentage} onChange={v => updateEducation(edu.id, "percentage", v)} placeholder="82% / 8.2 CGPA" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEducation} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Plus className="w-4 h-4" /> Add Another Education
                  </button>
                </div>
              )}

              {/* Experience */}
              {activeTab === "experience" && (
                <div className="space-y-4">
                  {data.experience.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No experience added. Click below to add work experience.
                      <br /><span className="text-xs">For freshers, you can skip this section.</span>
                    </p>
                  )}
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 border border-border rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Experience #{idx + 1}</span>
                        <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Company Name" value={exp.company} onChange={v => updateExperience(exp.id, "company", v)} placeholder="ABC Company" />
                        <Field label="Role/Designation" value={exp.role} onChange={v => updateExperience(exp.id, "role", v)} placeholder="Software Engineer" />
                        <Field label="Duration" value={exp.duration} onChange={v => updateExperience(exp.id, "duration", v)} placeholder="Jan 2022 - Present" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Responsibilities & Achievements</label>
                        <textarea
                          value={exp.description}
                          onChange={e => updateExperience(exp.id, "description", e.target.value)}
                          rows={3}
                          placeholder="- Developed features using React and Node.js&#10;- Improved performance by 30%"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Plus className="w-4 h-4" /> Add Work Experience
                  </button>
                </div>
              )}

              {/* Skills */}
              {activeTab === "skills" && (
                <div className="space-y-4">
                  {data.skills.map(cat => (
                    <div key={cat.id} className="p-4 border border-border rounded-xl space-y-3">
                      <Field label="Category Name" value={cat.category} onChange={v => updateSkillCategory(cat.id, "category", v)} placeholder="Technical Skills" />
                      <div className="flex gap-2">
                        <input
                          value={skillInput[cat.id] || ""}
                          onChange={e => setSkillInput(prev => ({ ...prev, [cat.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(cat.id); } }}
                          placeholder="Add a skill and press Enter"
                          className="flex-1 px-3 py-2 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={() => addSkill(cat.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map(skill => (
                          <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                            {skill}
                            <button onClick={() => removeSkill(cat.id, skill)} className="hover:text-red-500">×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={addSkillCategory} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Plus className="w-4 h-4" /> Add Skill Category
                  </button>
                </div>
              )}

              {/* Extras */}
              {activeTab === "extras" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Declaration</label>
                    <textarea
                      value={data.declaration}
                      onChange={e => setData(prev => ({ ...prev, declaration: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-20">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-border p-5 space-y-3">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white">Your Resume</h3>

              <button
                onClick={handleDownload}
                disabled={downloading || !data.personalDetails.fullName}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {downloading ? "Generating PDF..." : "Download PDF — Free"}
              </button>

              <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                ✓ ATS-Ready &nbsp;•&nbsp; ✓ A4 PDF &nbsp;•&nbsp; ✓ No Watermark
              </div>

              <div className="border border-gold-200 dark:border-gold-800 rounded-xl p-4 bg-gold-50 dark:bg-gold-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Premium Templates</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Access 8+ premium resume designs.</p>
                <button
                  onClick={() => toast.info("Razorpay payment — coming soon!")}
                  className="w-full py-2 text-sm font-semibold border-2 border-gold-500 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-500 hover:text-white transition-colors"
                >
                  Unlock for ₹49 only
                </button>
              </div>

              {/* ATS Tips */}
              <div className="border border-green-200 dark:border-green-800 rounded-xl p-4 bg-green-50 dark:bg-green-900/10">
                <div className="font-semibold text-sm text-green-700 dark:text-green-400 mb-2">💡 ATS Tips</div>
                <ul className="text-xs text-green-600 dark:text-green-500 space-y-1">
                  <li>• Use keywords from job description</li>
                  <li>• Avoid tables in ATS submissions</li>
                  <li>• Use standard section headings</li>
                  <li>• Include measurable achievements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-border rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
      />
    </div>
  );
}
