import { ResumeFormData } from "@/types";

function esc(text: string): string {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const FONTS = `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Slab:wght@300;400;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap`;

// Template 1: Modern Professional (ATS-Friendly, Free)
export function modernProTemplate(data: ResumeFormData): string {
  const pd = data.personalDetails;

  const sectionHead = (title: string) =>
    `<div class="sec-head"><span class="sec-text">${title}</span></div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(pd.fullName)} - Resume</title>
<link href="${FONTS}" rel="stylesheet" />
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', 'Source Sans 3', sans-serif;
    font-size: 10.5px;
    color: #1a1a2e;
    background: white;
    line-height: 1.5;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    background: white;
    display: grid;
    grid-template-rows: auto 1fr;
  }
  
  /* Header */
  .header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    padding: 22px 28px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .header-photo {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.3);
    overflow: hidden;
    flex-shrink: 0;
  }
  .header-photo img { width: 100%; height: 100%; object-fit: cover; }
  .header-info { flex: 1; }
  .name {
    font-size: 26px;
    font-weight: 700;
    color: white;
    font-family: 'Roboto Slab', serif;
    letter-spacing: -0.5px;
    line-height: 1.1;
    display: block;
  }
  .designation {
    font-size: 13px;
    color: #93c5fd;
    font-weight: 400;
    margin-top: 3px;
    display: block;
    letter-spacing: 0.5px;
  }
  .contact-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 10px;
  }
  .contact-item {
    font-size: 9.5px;
    color: #bfdbfe;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .contact-icon { font-size: 11px; }
  
  /* Main layout */
  .main {
    display: grid;
    grid-template-columns: 1fr 170px;
    min-height: calc(297mm - 116px);
  }
  
  .left-col {
    padding: 18px 20px 18px 28px;
    border-right: 1px solid #e2e8f0;
  }
  
  .right-col {
    padding: 18px 14px 18px 16px;
    background: #f8fafc;
  }
  
  /* Section headings */
  .sec-head {
    display: flex;
    align-items: center;
    margin: 14px 0 8px 0;
    gap: 8px;
  }
  .sec-head:first-child { margin-top: 0; }
  .sec-text {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #1a1a2e;
    white-space: nowrap;
    border-bottom: 2px solid #1a1a2e;
    padding-bottom: 2px;
  }
  .sec-head::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
    margin-left: 8px;
  }
  
  /* Objective */
  .objective {
    font-size: 10.5px;
    color: #374151;
    line-height: 1.65;
    font-style: italic;
    border-left: 3px solid #3b82f6;
    padding-left: 10px;
  }
  
  /* Experience */
  .exp-item { margin-bottom: 12px; }
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .exp-role {
    font-weight: 600;
    font-size: 11px;
    color: #111827;
  }
  .exp-duration {
    font-size: 9.5px;
    color: #6b7280;
    white-space: nowrap;
    background: #f3f4f6;
    padding: 1px 6px;
    border-radius: 9999px;
  }
  .exp-company {
    font-size: 10px;
    color: #3b82f6;
    font-weight: 500;
    margin: 1px 0 4px;
  }
  .exp-desc {
    font-size: 10px;
    color: #374151;
    line-height: 1.55;
    padding-left: 10px;
  }
  .exp-desc li { margin-bottom: 2px; }
  
  /* Education */
  .edu-item { margin-bottom: 10px; }
  .edu-degree { font-weight: 600; font-size: 10.5px; color: #111827; }
  .edu-institution { font-size: 10px; color: #4b5563; margin: 1px 0; }
  .edu-meta {
    display: flex;
    gap: 8px;
    font-size: 9.5px;
    color: #6b7280;
  }
  .edu-year { color: #3b82f6; font-weight: 500; }
  .edu-grade { color: #059669; font-weight: 500; }
  
  /* Skills */
  .skill-category { margin-bottom: 10px; }
  .skill-cat-name {
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
    margin-bottom: 4px;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
  }
  .skill-tag {
    font-size: 9px;
    background: #dbeafe;
    color: #1d4ed8;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 500;
  }
  
  /* Projects */
  .proj-item { margin-bottom: 10px; }
  .proj-name { font-weight: 600; font-size: 10.5px; color: #111827; }
  .proj-tech { font-size: 9.5px; color: #7c3aed; margin: 1px 0 3px; }
  .proj-desc { font-size: 10px; color: #374151; line-height: 1.5; }
  
  /* Right column - Skills, certs, etc */
  .right-sec-head {
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a2e;
    border-bottom: 2px solid #1a1a2e;
    padding-bottom: 2px;
    margin: 14px 0 8px 0;
  }
  .right-sec-head:first-child { margin-top: 0; }
  
  .cert-item { margin-bottom: 8px; }
  .cert-name { font-size: 10px; font-weight: 600; color: #111827; }
  .cert-issuer { font-size: 9.5px; color: #6b7280; }
  
  .lang-item {
    font-size: 10px;
    color: #374151;
    padding: 2px 0;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .link-item { font-size: 9.5px; color: #3b82f6; margin-bottom: 3px; word-break: break-all; }
  
  /* Declaration */
  .declaration {
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
  }
  .decl-title { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 4px; }
  .decl-text { font-size: 9.5px; color: #6b7280; font-style: italic; line-height: 1.6; }
  .decl-sign { margin-top: 8px; font-size: 9.5px; color: #374151; }
</style>
</head>
<body>
<div class="page">
  <!-- Header -->
  <div class="header">
    ${pd.photo ? `<div class="header-photo"><img src="${pd.photo}" alt="Photo" /></div>` : ""}
    <div class="header-info">
      <span class="name">${esc(pd.fullName)}</span>
      ${pd.designation ? `<span class="designation">${esc(pd.designation)}</span>` : ""}
      <div class="contact-grid">
        ${pd.email ? `<span class="contact-item"><span class="contact-icon">✉</span>${esc(pd.email)}</span>` : ""}
        ${pd.phone ? `<span class="contact-item"><span class="contact-icon">✆</span>${esc(pd.phone)}</span>` : ""}
        ${pd.location ? `<span class="contact-item"><span class="contact-icon">◎</span>${esc(pd.location)}</span>` : ""}
        ${pd.linkedin ? `<span class="contact-item"><span class="contact-icon">in</span>${esc(pd.linkedin)}</span>` : ""}
        ${pd.github ? `<span class="contact-item"><span class="contact-icon">⌥</span>${esc(pd.github)}</span>` : ""}
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="main">
    <div class="left-col">
      ${data.careerObjective ? `
      ${sectionHead("Career Objective")}
      <p class="objective">${esc(data.careerObjective)}</p>
      ` : ""}

      ${data.experience && data.experience.length > 0 ? `
      ${sectionHead("Work Experience")}
      ${data.experience.map(exp => `
        <div class="exp-item">
          <div class="exp-header">
            <span class="exp-role">${esc(exp.role)}</span>
            <span class="exp-duration">${esc(exp.startDate)} – ${exp.isCurrentRole ? "Present" : esc(exp.endDate)}</span>
          </div>
          <div class="exp-company">${esc(exp.company)}${exp.location ? ` | ${esc(exp.location)}` : ""}</div>
          ${exp.description && exp.description.length ? `
          <ul class="exp-desc">
            ${exp.description.filter(Boolean).map(d => `<li>${esc(d)}</li>`).join("")}
          </ul>` : ""}
        </div>
      `).join("")}
      ` : ""}

      ${data.education && data.education.length > 0 ? `
      ${sectionHead("Education")}
      ${data.education.map(edu => `
        <div class="edu-item">
          <div class="edu-degree">${esc(edu.degree)}${edu.field ? ` — ${esc(edu.field)}` : ""}</div>
          <div class="edu-institution">${esc(edu.institution)}${edu.board ? ` | ${esc(edu.board)}` : ""}</div>
          <div class="edu-meta">
            <span class="edu-year">${esc(edu.endYear || edu.startYear)}</span>
            ${edu.percentage ? `<span class="edu-grade">${esc(edu.percentage)}</span>` : ""}
          </div>
        </div>
      `).join("")}
      ` : ""}

      ${data.projects && data.projects.length > 0 ? `
      ${sectionHead("Projects")}
      ${data.projects.map(proj => `
        <div class="proj-item">
          <div class="proj-name">${esc(proj.name)}</div>
          <div class="proj-tech">${esc(proj.technologies.join(" • "))}</div>
          <div class="proj-desc">${esc(proj.description)}</div>
        </div>
      `).join("")}
      ` : ""}

      ${data.declaration ? `
      <div class="declaration">
        <div class="decl-title">Declaration</div>
        <div class="decl-text">${esc(data.declaration)}</div>
        <div class="decl-sign">
          <br/>Date: _______________&nbsp;&nbsp;&nbsp;&nbsp;Place: _______________
          <br/><br/>Signature: _______________
        </div>
      </div>` : ""}
    </div>

    <!-- Right Column -->
    <div class="right-col">
      ${data.skills && data.skills.length > 0 ? `
      <div class="right-sec-head">Skills</div>
      ${data.skills.map(sg => `
        <div class="skill-category">
          <div class="skill-cat-name">${esc(sg.category)}</div>
          <div class="skill-tags">
            ${sg.skills.map(s => `<span class="skill-tag">${esc(s)}</span>`).join("")}
          </div>
        </div>
      `).join("")}
      ` : ""}

      ${data.certifications && data.certifications.length > 0 ? `
      <div class="right-sec-head">Certifications</div>
      ${data.certifications.map(cert => `
        <div class="cert-item">
          <div class="cert-name">${esc(cert.name)}</div>
          <div class="cert-issuer">${esc(cert.issuer)} | ${esc(cert.date)}</div>
        </div>
      `).join("")}
      ` : ""}

      ${data.languages && data.languages.length > 0 ? `
      <div class="right-sec-head">Languages</div>
      ${data.languages.map(lang => `<div class="lang-item">${esc(lang)}</div>`).join("")}
      ` : ""}

      ${pd.github || pd.website ? `
      <div class="right-sec-head">Links</div>
      ${pd.github ? `<div class="link-item">⌥ ${esc(pd.github)}</div>` : ""}
      ${pd.website ? `<div class="link-item">🌐 ${esc(pd.website)}</div>` : ""}
      ` : ""}
    </div>
  </div>
</div>
</body>
</html>`;
}

// Template 2: Classic ATS (Free)  
export function classicATSTemplate(data: ResumeFormData): string {
  const pd = data.personalDetails;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(pd.fullName)} - Resume</title>
<style>
  @page { size: A4; margin: 18mm 20mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11px;
    color: #000;
    background: white;
    line-height: 1.45;
  }
  .name { font-size: 22px; font-weight: bold; text-align: center; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 4px; }
  .contact-line { text-align: center; font-size: 10px; color: #333; margin-bottom: 12px; }
  .sec-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #000; padding-bottom: 2px; margin: 12px 0 7px; }
  .sec-title:first-child { margin-top: 0; }
  .exp-header { display: flex; justify-content: space-between; }
  .role { font-weight: bold; font-size: 11px; }
  .company { font-size: 10.5px; color: #222; }
  .duration { font-size: 10px; font-style: italic; color: #444; }
  ul { padding-left: 14px; margin: 4px 0 8px; }
  ul li { font-size: 10.5px; margin-bottom: 1.5px; }
  .edu-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .edu-left .degree { font-weight: bold; font-size: 11px; }
  .edu-left .inst { font-size: 10.5px; color: #333; }
  .edu-right { text-align: right; font-size: 10px; color: #444; }
  .skills-grid { columns: 2; column-gap: 16px; }
  .skill-group { break-inside: avoid; margin-bottom: 6px; }
  .skill-group-name { font-weight: bold; font-size: 10px; }
  .skill-list { font-size: 10.5px; color: #222; }
  .objective { font-size: 10.5px; line-height: 1.6; color: #111; margin-bottom: 4px; }
  .decl { font-size: 10px; font-style: italic; color: #444; margin-top: 14px; padding-top: 8px; border-top: 1px solid #ccc; }
  .cert-item { margin-bottom: 5px; font-size: 10.5px; }
</style>
</head>
<body>
  <div class="name">${esc(pd.fullName)}</div>
  <div class="contact-line">
    ${[pd.email, pd.phone, pd.location, pd.linkedin].filter(Boolean).map(esc).join(" | ")}
  </div>

  ${data.careerObjective ? `<div class="sec-title">Objective</div><p class="objective">${esc(data.careerObjective)}</p>` : ""}

  ${data.education && data.education.length ? `
  <div class="sec-title">Education</div>
  ${data.education.map(edu => `
    <div class="edu-row">
      <div class="edu-left">
        <div class="degree">${esc(edu.degree)}${edu.field ? ` in ${esc(edu.field)}` : ""}</div>
        <div class="inst">${esc(edu.institution)}${edu.board ? ` | ${esc(edu.board)}` : ""}</div>
      </div>
      <div class="edu-right">
        <div>${esc(edu.endYear || edu.startYear)}</div>
        ${edu.percentage ? `<div>${esc(edu.percentage)}</div>` : ""}
      </div>
    </div>
  `).join("")}` : ""}

  ${data.experience && data.experience.length ? `
  <div class="sec-title">Work Experience</div>
  ${data.experience.map(exp => `
    <div class="exp-header">
      <span class="role">${esc(exp.role)}, <span class="company">${esc(exp.company)}</span></span>
      <span class="duration">${esc(exp.startDate)} – ${exp.isCurrentRole ? "Present" : esc(exp.endDate)}</span>
    </div>
    ${exp.description && exp.description.filter(Boolean).length ? `<ul>${exp.description.filter(Boolean).map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : "<br/>"}
  `).join("")}` : ""}

  ${data.skills && data.skills.length ? `
  <div class="sec-title">Skills</div>
  <div class="skills-grid">
    ${data.skills.map(sg => `
      <div class="skill-group">
        <div class="skill-group-name">${esc(sg.category)}:</div>
        <div class="skill-list">${sg.skills.map(esc).join(", ")}</div>
      </div>
    `).join("")}
  </div>` : ""}

  ${data.projects && data.projects.length ? `
  <div class="sec-title">Projects</div>
  ${data.projects.map(proj => `
    <div style="margin-bottom:7px;">
      <strong>${esc(proj.name)}</strong> <span style="font-size:9.5px;color:#555;">[${esc(proj.technologies.join(", "))}]</span><br/>
      <span style="font-size:10.5px;">${esc(proj.description)}</span>
    </div>
  `).join("")}` : ""}

  ${data.certifications && data.certifications.length ? `
  <div class="sec-title">Certifications</div>
  ${data.certifications.map(c => `<div class="cert-item"><strong>${esc(c.name)}</strong> — ${esc(c.issuer)}, ${esc(c.date)}</div>`).join("")}` : ""}

  ${data.languages && data.languages.length ? `
  <div class="sec-title">Languages</div>
  <p style="font-size:10.5px;">${data.languages.map(esc).join(", ")}</p>` : ""}

  ${data.declaration ? `
  <div class="decl">
    <strong>Declaration:</strong> ${esc(data.declaration)}
    <br/><br/>Date: _______________ &nbsp;&nbsp; Place: _______________ &nbsp;&nbsp; Signature: _______________
  </div>` : ""}
</body>
</html>`;
}

export function generateResumeHTML(data: ResumeFormData): string {
  switch (data.template) {
    case "classic-ats":
      return classicATSTemplate(data);
    case "modern-pro":
    default:
      return modernProTemplate(data);
  }
}
