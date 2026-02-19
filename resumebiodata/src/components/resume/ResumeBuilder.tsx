"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Download, Plus, Trash2, Loader2, Sparkles, Lock } from "lucide-react";
import { ResumeFormData, EducationEntry, ExperienceEntry, SkillGroup, ProjectEntry, CertificationEntry } from "@/types";
import { generateId } from "@/lib/utils";

const TEMPLATES = [
  { id: "modern-pro", name: "Modern Pro", ats: 95, free: true, emoji: "🎨", desc: "Dark header, two-column" },
  { id: "classic-ats", name: "Classic ATS", ats: 99, free: true, emoji: "📋", desc: "Max ATS compatibility" },
  { id: "minimal-premium", name: "Minimal", ats: 92, free: false, emoji: "✨", price: 49, desc: "Clean premium design" },
  { id: "executive-premium", name: "Executive", ats: 94, free: false, emoji: "👔", price: 49, desc: "Leadership style" },
];

const INIT: ResumeFormData = {
  personalDetails: { fullName: "", designation: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "" },
  careerObjective: "",
  education: [{ id: "edu1", degree: "", field: "", institution: "", board: "", startYear: "", endYear: "", percentage: "", grade: "" }],
  experience: [],
  skills: [{ id: "sk1", category: "Technical Skills", skills: [] }],
  projects: [],
  certifications: [],
  languages: ["English", "Marathi", "Hindi"],
  hobbies: [],
  declaration: "I hereby declare that all the information stated above is true and correct to the best of my knowledge and belief.",
  template: "modern-pro",
  colorScheme: "blue",
};

type Tab = "personal" | "objective" | "education" | "experience" | "skills" | "projects" | "extras";
const TABS: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "objective", label: "Objective" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "extras", label: "Extras" },
];

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeFormData>(INIT);
  const [tab, setTab] = useState<Tab>("personal");
  const [downloading, setDownloading] = useState(false);
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const upPD = (f: string, v: string) => setResume((p) => ({ ...p, personalDetails: { ...p.personalDetails, [f]: v } }));
  const upR = <K extends keyof ResumeFormData>(f: K, v: ResumeFormData[K]) => setResume((p) => ({ ...p, [f]: v }));

  // Education
  const addEdu = () => setResume((p) => ({ ...p, education: [...p.education, { id: generateId(), degree: "", field: "", institution: "", board: "", startYear: "", endYear: "", percentage: "", grade: "" }] }));
  const upEdu = (id: string, f: keyof EducationEntry, v: string) => setResume((p) => ({ ...p, education: p.education.map((e) => e.id === id ? { ...e, [f]: v } : e) }));
  const rmEdu = (id: string) => setResume((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));

  // Experience
  const addExp = () => setResume((p) => ({ ...p, experience: [...p.experience, { id: generateId(), company: "", role: "", location: "", startDate: "", endDate: "", isCurrentRole: false, description: [""] }] }));
  const upExp = (id: string, f: keyof ExperienceEntry, v: unknown) => setResume((p) => ({ ...p, experience: p.experience.map((e) => e.id === id ? { ...e, [f]: v } : e) }));
  const rmExp = (id: string) => setResume((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }));

  // Skills
  const addSG = () => setResume((p) => ({ ...p, skills: [...p.skills, { id: generateId(), category: "New Skills", skills: [] }] }));
  const upSGCat = (id: string, cat: string) => setResume((p) => ({ ...p, skills: p.skills.map((s) => s.id === id ? { ...s, category: cat } : s) }));
  const addSkill = (id: string) => {
    const v = (skillInputs[id] || "").trim();
    if (!v) return;
    setResume((p) => ({ ...p, skills: p.skills.map((s) => s.id === id ? { ...s, skills: [...s.skills, v] } : s) }));
    setSkillInputs((prev) => ({ ...prev, [id]: "" }));
  };
  const rmSkill = (gid: string, skill: string) => setResume((p) => ({ ...p, skills: p.skills.map((s) => s.id === gid ? { ...s, skills: s.skills.filter((sk) => sk !== skill) } : s) }));
  const rmSG = (id: string) => setResume((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));

  // Projects
  const addProj = () => setResume((p) => ({ ...p, projects: [...p.projects, { id: generateId(), name: "", description: "", technologies: [], link: "", github: "", duration: "" }] }));
  const upProj = (id: string, f: keyof ProjectEntry, v: unknown) => setResume((p) => ({ ...p, projects: p.projects.map((pr) => pr.id === id ? { ...pr, [f]: v } : pr) }));
  const rmProj = (id: string) => setResume((p) => ({ ...p, projects: p.projects.filter((pr) => pr.id !== id) }));

  // Certs
  const addCert = () => setResume((p) => ({ ...p, certifications: [...p.certifications, { id: generateId(), name: "", issuer: "", date: "", credentialId: "", link: "" }] }));
  const upCert = (id: string, f: keyof CertificationEntry, v: string) => setResume((p) => ({ ...p, certifications: p.certifications.map((c) => c.id === id ? { ...c, [f]: v } : c) }));
  const rmCert = (id: string) => setResume((p) => ({ ...p, certifications: p.certifications.filter((c) => c.id !== id) }));

  const download = async () => {
    if (!resume.personalDetails.fullName.trim()) { toast.error("Please enter your full name"); return; }
    setDownloading(true);
    try {
      const res = await fetch("/api/download-resume", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(resume) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${resume.personalDetails.fullName || "resume"}_resume.pdf`;
      a.click(); URL.revokeObjectURL(url);
      toast.success("🎉 Resume downloaded successfully!");
    } catch (e) {
      toast.error((e as Error).message || "Download failed");
    } finally { setDownloading(false); }
  };

  const F = ({ label, value, onChange, placeholder, type = "text", required }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
  }) => (
    <div>
      <label className="form-label text-xs">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="form-input text-sm" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Templates */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-display font-bold text-xl text-foreground mb-4">Choose Template</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => (
                <button key={tpl.id}
                  onClick={() => { if (!tpl.free) { toast.info(`Premium — unlock for ₹${tpl.price}`); return; } upR("template", tpl.id as ResumeFormData["template"]); }}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all ${resume.template === tpl.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:border-blue-300"}`}
                >
                  {!tpl.free && <div className="absolute top-1 right-1 bg-gold-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full flex items-center gap-0.5"><Lock className="w-2 h-2" />₹{tpl.price}</div>}
                  {tpl.free && <div className="absolute top-1 left-1 bg-green-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full">ATS {tpl.ats}%</div>}
                  <div className="text-2xl mb-1 mt-2">{tpl.emoji}</div>
                  <div className="text-[10px] font-semibold text-foreground">{tpl.name}</div>
                  <div className="text-[9px] text-muted-foreground">{tpl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex overflow-x-auto border-b border-border no-scrollbar">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-shrink-0 px-4 py-3.5 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >{t.label}</button>
              ))}
            </div>

            <div className="p-5">
              {tab === "personal" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><F label="Full Name *" value={resume.personalDetails.fullName} onChange={(v) => upPD("fullName", v)} placeholder="Your Full Name" required /></div>
                  <F label="Designation / Title" value={resume.personalDetails.designation} onChange={(v) => upPD("designation", v)} placeholder="Software Engineer" />
                  <F label="Email *" value={resume.personalDetails.email} onChange={(v) => upPD("email", v)} placeholder="email@example.com" type="email" required />
                  <F label="Phone" value={resume.personalDetails.phone} onChange={(v) => upPD("phone", v)} placeholder="+91 98765 43210" type="tel" />
                  <F label="Location" value={resume.personalDetails.location} onChange={(v) => upPD("location", v)} placeholder="City, State" />
                  <F label="LinkedIn" value={resume.personalDetails.linkedin || ""} onChange={(v) => upPD("linkedin", v)} placeholder="linkedin.com/in/yourname" />
                  <F label="GitHub" value={resume.personalDetails.github || ""} onChange={(v) => upPD("github", v)} placeholder="github.com/yourname" />
                  <div className="sm:col-span-2"><F label="Portfolio / Website" value={resume.personalDetails.website || ""} onChange={(v) => upPD("website", v)} placeholder="https://yoursite.com" type="url" /></div>
                </div>
              )}

              {tab === "objective" && (
                <div>
                  <label className="form-label">Career Objective / Professional Summary</label>
                  <textarea value={resume.careerObjective} onChange={(e) => upR("careerObjective", e.target.value)} rows={5}
                    placeholder="Motivated [role] with [X] years in [domain]. Seeking to leverage [skills] at [company] to achieve [goal]..."
                    className="form-input resize-none" />
                  <p className="text-xs text-muted-foreground mt-2">💡 2-3 sentences. Mention experience, key skills, and career goal.</p>
                </div>
              )}

              {tab === "education" && (
                <div className="space-y-4">
                  {resume.education.map((edu, i) => (
                    <div key={edu.id} className="border border-border rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">Education #{i + 1}</span>
                        {resume.education.length > 1 && <button onClick={() => rmEdu(edu.id)} className="text-destructive p-1" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <F label="Degree" value={edu.degree} onChange={(v) => upEdu(edu.id, "degree", v)} placeholder="B.E. / B.Tech / B.Sc" />
                        <F label="Field of Study" value={edu.field} onChange={(v) => upEdu(edu.id, "field", v)} placeholder="Computer Science" />
                        <F label="Institution" value={edu.institution} onChange={(v) => upEdu(edu.id, "institution", v)} placeholder="College Name" />
                        <F label="Board / University" value={edu.board} onChange={(v) => upEdu(edu.id, "board", v)} placeholder="Pune University" />
                        <F label="Start Year" value={edu.startYear} onChange={(v) => upEdu(edu.id, "startYear", v)} placeholder="2019" />
                        <F label="End Year" value={edu.endYear} onChange={(v) => upEdu(edu.id, "endYear", v)} placeholder="2023" />
                        <F label="Percentage / CGPA" value={edu.percentage} onChange={(v) => upEdu(edu.id, "percentage", v)} placeholder="82% / 8.2 CGPA" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEdu} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"><Plus className="w-4 h-4" /> Add Education</button>
                </div>
              )}

              {tab === "experience" && (
                <div className="space-y-4">
                  {resume.experience.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No experience added yet.</p>
                      <p className="text-xs opacity-70">(Freshers can skip this section)</p>
                    </div>
                  )}
                  {resume.experience.map((exp, i) => (
                    <div key={exp.id} className="border border-border rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">Experience #{i + 1}</span>
                        <button onClick={() => rmExp(exp.id)} className="text-destructive p-1" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <F label="Company" value={exp.company} onChange={(v) => upExp(exp.id, "company", v)} placeholder="Company Name" />
                        <F label="Role / Designation" value={exp.role} onChange={(v) => upExp(exp.id, "role", v)} placeholder="Software Engineer" />
                        <F label="Start Date" value={exp.startDate} onChange={(v) => upExp(exp.id, "startDate", v)} placeholder="Jan 2022" />
                        <div className="flex items-end gap-2">
                          <div className="flex-1"><F label="End Date" value={exp.endDate} onChange={(v) => upExp(exp.id, "endDate", v)} placeholder="Dec 2023" /></div>
                          <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 cursor-pointer whitespace-nowrap">
                            <input type="checkbox" checked={exp.isCurrentRole} onChange={(e) => upExp(exp.id, "isCurrentRole", e.target.checked)} className="rounded" /> Current
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="form-label text-xs">Key Responsibilities & Achievements</label>
                        {exp.description.map((d, di) => (
                          <input key={di} value={d}
                            onChange={(e) => { const nd = [...exp.description]; nd[di] = e.target.value; upExp(exp.id, "description", nd); }}
                            placeholder={`Point ${di + 1} — start with action verb (e.g. "Developed...", "Led...")`}
                            className="form-input text-sm mb-2" />
                        ))}
                        <button onClick={() => upExp(exp.id, "description", [...exp.description, ""])}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add point</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={addExp} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"><Plus className="w-4 h-4" /> Add Work Experience</button>
                </div>
              )}

              {tab === "skills" && (
                <div className="space-y-4">
                  {resume.skills.map((sg) => (
                    <div key={sg.id} className="border border-border rounded-xl p-4 space-y-3">
                      <div className="flex gap-2">
                        <input value={sg.category} onChange={(e) => upSGCat(sg.id, e.target.value)} className="form-input text-sm font-semibold flex-1" placeholder="Category name" />
                        <button onClick={() => rmSG(sg.id)} className="text-destructive p-2 hover:bg-destructive/10 rounded-lg" aria-label="Remove group"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="flex gap-2">
                        <input value={skillInputs[sg.id] || ""} onChange={(e) => setSkillInputs((p) => ({ ...p, [sg.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(sg.id); } }}
                          placeholder="Type skill, press Enter" className="form-input text-sm flex-1" />
                        <button onClick={() => addSkill(sg.id)} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sg.skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center gap-1.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full font-medium">
                            {skill}
                            <button onClick={() => rmSkill(sg.id, skill)} className="hover:text-blue-900 dark:hover:text-blue-100 ml-0.5" aria-label={`Remove ${skill}`}>×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={addSG} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"><Plus className="w-4 h-4" /> Add Skill Category</button>
                </div>
              )}

              {tab === "projects" && (
                <div className="space-y-4">
                  {resume.projects.map((proj, i) => (
                    <div key={proj.id} className="border border-border rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">Project #{i + 1}</span>
                        <button onClick={() => rmProj(proj.id)} className="text-destructive p-1" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <F label="Project Name" value={proj.name} onChange={(v) => upProj(proj.id, "name", v)} placeholder="E-commerce App, Portfolio..." />
                      <div>
                        <label className="form-label text-xs">Description</label>
                        <textarea value={proj.description} onChange={(e) => upProj(proj.id, "description", e.target.value)} rows={3}
                          placeholder="What you built, your role, key features & outcome..." className="form-input resize-none text-sm" />
                      </div>
                      <F label="Technologies Used" value={proj.technologies.join(", ")}
                        onChange={(v) => upProj(proj.id, "technologies", v.split(",").map((t) => t.trim()).filter(Boolean))}
                        placeholder="React, Node.js, MongoDB, AWS..." />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <F label="Live URL (optional)" value={proj.link || ""} onChange={(v) => upProj(proj.id, "link", v)} placeholder="https://..." type="url" />
                        <F label="GitHub (optional)" value={proj.github || ""} onChange={(v) => upProj(proj.id, "github", v)} placeholder="github.com/..." />
                      </div>
                    </div>
                  ))}
                  <button onClick={addProj} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"><Plus className="w-4 h-4" /> Add Project</button>
                </div>
              )}

              {tab === "extras" && (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="form-label !mb-0">Certifications</label>
                      <button onClick={addCert} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                    </div>
                    {resume.certifications.map((cert) => (
                      <div key={cert.id} className="border border-border rounded-xl p-3 mb-3">
                        <div className="flex justify-end mb-2"><button onClick={() => rmCert(cert.id)} className="text-destructive p-1" aria-label="Remove"><Trash2 className="w-3.5 h-3.5" /></button></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <F label="Name" value={cert.name} onChange={(v) => upCert(cert.id, "name", v)} placeholder="AWS Solutions Architect" />
                          <F label="Issuer" value={cert.issuer} onChange={(v) => upCert(cert.id, "issuer", v)} placeholder="Amazon / Google / Coursera" />
                          <F label="Date" value={cert.date} onChange={(v) => upCert(cert.id, "date", v)} placeholder="Jan 2024" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="form-label">Languages Known</label>
                    <input value={resume.languages.join(", ")}
                      onChange={(e) => upR("languages", e.target.value.split(",").map((l) => l.trim()).filter(Boolean) as string[])}
                      placeholder="English, Marathi, Hindi..." className="form-input text-sm" />
                  </div>

                  <div>
                    <label className="form-label">Declaration</label>
                    <textarea value={resume.declaration} onChange={(e) => upR("declaration", e.target.value)} rows={3} className="form-input resize-none text-sm" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-20 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">Your Resume</h3>
                <p className="text-xs text-muted-foreground">Ready to download as HD PDF</p>
              </div>
              <button onClick={download} disabled={downloading || !resume.personalDetails.fullName.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${!resume.personalDetails.fullName.trim() ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg hover:-translate-y-0.5"}`}
              >
                {downloading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</> : <><Download className="w-4 h-4" /> Download PDF — Free</>}
              </button>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["ATS Ready", "A4 PDF", "No Mark"].map((b) => (
                  <div key={b} className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg py-1.5 font-medium">✓ {b}</div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h3 className="font-bold text-sm text-foreground">Premium Templates</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Minimal & Executive designs with premium typography.</p>
              <button onClick={() => toast.info("Add Razorpay API keys in .env to enable payments!")} className="w-full btn-gold text-sm py-2.5 rounded-xl">
                Unlock — ₹49
              </button>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl p-4">
              <h4 className="font-semibold text-sm text-green-700 dark:text-green-400 mb-2">💡 ATS Tips</h4>
              <ul className="text-xs text-green-600 dark:text-green-500 space-y-1">
                <li>• Match keywords from job description</li>
                <li>• Quantify achievements with numbers</li>
                <li>• Use standard heading names</li>
                <li>• Avoid tables & graphics for ATS</li>
                <li>• Save as PDF before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
