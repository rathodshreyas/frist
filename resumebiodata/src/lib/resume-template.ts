import { ResumeFormData } from "@/types";

export function generateResumeHTML(data: ResumeFormData, templateId: string): string {
  const { personalDetails: pd } = data;

  const modern = templateId === "modern" || templateId === "ats";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${pd.fullName || "Resume"}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 15mm 16mm; }
  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    font-size: 11px;
    color: #1a1a1a;
    line-height: 1.5;
    background: white;
  }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 0; background: white; }

  /* Modern Template */
  .header-modern {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    color: white;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .name-title { flex: 1; }
  .name-title h1 { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
  .name-title p { font-size: 12px; opacity: 0.8; }
  .contact-right { text-align: right; font-size: 10.5px; opacity: 0.85; line-height: 2; }
  .main-modern { display: grid; grid-template-columns: 2fr 1fr; gap: 0; }
  .left-col { padding: 20px 20px 20px 24px; border-right: 1px solid #e5e7eb; }
  .right-col { padding: 20px 24px 20px 16px; background: #f9fafb; }
  .section-head {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #0f172a;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 4px;
    margin: 16px 0 10px 0;
  }
  .section-head:first-child { margin-top: 0; }
  .exp-item { margin-bottom: 14px; }
  .exp-title { font-weight: 600; font-size: 12px; color: #0f172a; }
  .exp-sub { font-size: 10.5px; color: #6b7280; margin-bottom: 4px; }
  .exp-desc { font-size: 10.5px; color: #374151; line-height: 1.55; }
  .edu-row { margin-bottom: 10px; }
  .edu-degree { font-weight: 600; font-size: 11.5px; color: #0f172a; }
  .edu-detail { font-size: 10.5px; color: #6b7280; }
  .skill-tag {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 9.5px;
    font-weight: 500;
    margin: 2px 2px 2px 0;
  }
  .objective { font-size: 11px; color: #374151; line-height: 1.65; font-style: italic; }
  .contact-line { font-size: 10.5px; color: #374151; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
  .declaration { font-size: 10.5px; color: #6b7280; font-style: italic; margin-top: 12px; }
  .badge { background: #dbeafe; color: #1d4ed8; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; margin-left: 6px; }
</style>
</head>
<body>
<div class="page">
  <div class="header-modern">
    <div class="name-title">
      <h1>${pd.fullName || ""}</h1>
      <p>${data.experience?.[0]?.role || "Professional"} | ${pd.address || ""}</p>
    </div>
    ${pd.photo ? `<img src="${pd.photo}" style="width:70px;height:80px;object-fit:cover;border-radius:4px;border:2px solid rgba(255,255,255,0.3);margin-right:16px;" />` : ""}
    <div class="contact-right">
      <div>${pd.email || ""}</div>
      <div>${pd.phone || ""}</div>
      ${pd.linkedin ? `<div>${pd.linkedin}</div>` : ""}
      ${pd.github ? `<div>${pd.github}</div>` : ""}
    </div>
  </div>

  <div class="main-modern">
    <!-- Left Column -->
    <div class="left-col">
      ${data.careerObjective ? `
      <div class="section-head">Career Objective</div>
      <p class="objective">${data.careerObjective}</p>
      ` : ""}

      ${data.experience?.length ? `
      <div class="section-head">Work Experience</div>
      ${data.experience.map(e => `
        <div class="exp-item">
          <div class="exp-title">${e.role} <span style="font-weight:400;color:#4b5563;">at ${e.company}</span></div>
          <div class="exp-sub">${e.duration}</div>
          <div class="exp-desc">${e.description}</div>
        </div>
      `).join("")}
      ` : ""}

      ${data.education?.length ? `
      <div class="section-head">Education</div>
      ${data.education.map(e => `
        <div class="edu-row">
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-detail">${e.institution} | ${e.board} | ${e.year} | ${e.percentage}</div>
        </div>
      `).join("")}
      ` : ""}

      ${data.projects?.length ? `
      <div class="section-head">Projects</div>
      ${data.projects.map(p => `
        <div class="exp-item">
          <div class="exp-title">${p.name}</div>
          <div class="exp-sub">${p.technologies}</div>
          <div class="exp-desc">${p.description}</div>
        </div>
      `).join("")}
      ` : ""}
    </div>

    <!-- Right Column -->
    <div class="right-col">
      ${data.skills?.length ? `
      <div class="section-head">Skills</div>
      ${data.skills.map(cat => `
        <div style="margin-bottom:12px;">
          <div style="font-weight:600;font-size:10.5px;color:#374151;margin-bottom:4px;">${cat.category}</div>
          <div>${cat.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}</div>
        </div>
      `).join("")}
      ` : ""}

      ${data.certifications?.length ? `
      <div class="section-head">Certifications</div>
      ${data.certifications.map(c => `
        <div style="margin-bottom:8px;">
          <div style="font-weight:600;font-size:11px;">${c.name}</div>
          <div style="font-size:10px;color:#6b7280;">${c.issuer} | ${c.year}</div>
        </div>
      `).join("")}
      ` : ""}

      ${pd.linkedin || pd.github || pd.website ? `
      <div class="section-head">Links</div>
      ${pd.linkedin ? `<div class="contact-line">🔗 ${pd.linkedin}</div>` : ""}
      ${pd.github ? `<div class="contact-line">🐙 ${pd.github}</div>` : ""}
      ${pd.website ? `<div class="contact-line">🌐 ${pd.website}</div>` : ""}
      ` : ""}
    </div>
  </div>

  ${data.declaration ? `
  <div style="padding:12px 24px;border-top:1px solid #e5e7eb;">
    <div class="section-head">Declaration</div>
    <p class="declaration">${data.declaration}</p>
  </div>
  ` : ""}
</div>
</body>
</html>`;
}
