import { BiodataFormData } from "@/types";

function escapeHtml(text: string): string {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap`;

function row(
  label: string,
  marathiLabel: string,
  value: string,
  lang: string
): string {
  if (!value || value.trim() === "") return "";
  const displayLabel = lang === "marathi" ? marathiLabel : lang === "bilingual" ? `${marathiLabel} / ${label}` : label;
  const escaped = escapeHtml(value);
  return `
    <tr>
      <td class="label-cell">${displayLabel}</td>
      <td class="separator">:</td>
      <td class="value-cell">${escaped}</td>
    </tr>`;
}

// Template 1: Ganpati Classic (Free)
export function ganpatiClassicTemplate(data: BiodataFormData): string {
  const lang = data.language || "marathi";
  const isMarathi = lang !== "english";

  return `<!DOCTYPE html>
<html lang="${isMarathi ? "mr" : "en"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Marriage Biodata - ${escapeHtml(data.naam)}</title>
<link href="${GOOGLE_FONTS_URL}" rel="stylesheet" />
<style>
  @page {
    size: A4;
    margin: 12mm 14mm;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: ${isMarathi ? "'Noto Sans Devanagari'" : "'Cormorant Garamond'"}, serif;
    background: #fffdf0;
    color: #2d1a00;
    font-size: ${isMarathi ? "13px" : "14px"};
    line-height: 1.7;
  }
  
  .page {
    width: 100%;
    min-height: 267mm;
    background: linear-gradient(135deg, #fffdf0 0%, #fef9e7 100%);
    position: relative;
    padding: 8px;
  }
  
  /* Outer decorative border */
  .outer-border {
    border: 4px solid #b45309;
    border-radius: 4px;
    padding: 6px;
    min-height: calc(267mm - 16px);
  }
  
  .inner-border {
    border: 1.5px solid #d97706;
    border-radius: 3px;
    padding: 18px 22px;
    min-height: calc(267mm - 32px);
    background: linear-gradient(180deg, #fffdf5 0%, #fffbeb 100%);
    position: relative;
  }
  
  /* Corner ornaments */
  .corner {
    position: absolute;
    width: 30px;
    height: 30px;
    font-size: 22px;
    line-height: 1;
    color: #b45309;
  }
  .corner-tl { top: -2px; left: -2px; }
  .corner-tr { top: -2px; right: -2px; transform: scaleX(-1); }
  .corner-bl { bottom: -2px; left: -2px; transform: scaleY(-1); }
  .corner-br { bottom: -2px; right: -2px; transform: scale(-1); }
  
  /* Ganpati Header */
  .ganpati-header {
    text-align: center;
    padding-bottom: 14px;
    border-bottom: 2px solid #d97706;
    margin-bottom: 14px;
    position: relative;
  }
  
  .ganesh-symbol {
    font-size: 36px;
    display: block;
    margin-bottom: 4px;
    color: #b45309;
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-weight: 700;
  }
  
  .ganesh-blessing {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #92400e;
    letter-spacing: 3px;
    display: block;
    margin-bottom: 6px;
  }
  
  .gold-line {
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);
    margin: 6px auto;
  }
  
  .biodata-title {
    font-size: 26px;
    font-weight: 700;
    color: #78350f;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: block;
    margin: 4px 0;
  }
  
  .biodata-title-marathi {
    font-size: 22px;
    font-weight: 700;
    color: #78350f;
    font-family: 'Noto Sans Devanagari', sans-serif;
    display: block;
  }
  
  /* Photo */
  .photo-wrapper {
    float: right;
    margin: 0 0 12px 16px;
    width: 115px;
  }
  
  .photo-frame {
    border: 3px solid #d97706;
    padding: 3px;
    background: white;
    box-shadow: 0 4px 12px rgba(180, 83, 9, 0.2);
  }
  
  .photo-frame img {
    width: 109px;
    height: 135px;
    object-fit: cover;
    display: block;
  }
  
  .photo-frame-inner {
    border: 1px solid #f59e0b;
  }
  
  /* Section */
  .section {
    margin-bottom: 12px;
    clear: none;
  }
  
  .section-title {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #92400e;
    border-bottom: 1.5px solid #fcd34d;
    padding-bottom: 3px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: linear-gradient(90deg, rgba(251,191,36,0.1), transparent);
    padding: 3px 8px;
    border-left: 3px solid #d97706;
  }
  
  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .label-cell {
    font-weight: 600;
    color: #92400e;
    width: 38%;
    padding: 3.5px 10px 3.5px 0;
    font-size: 12.5px;
    vertical-align: top;
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
  
  .separator {
    width: 12px;
    color: #b45309;
    font-weight: 700;
    padding: 3.5px 6px 3.5px 0;
    vertical-align: top;
  }
  
  .value-cell {
    color: #1c0a00;
    padding: 3.5px 0;
    font-size: 12.5px;
    border-bottom: 1px dashed #fde68a;
    vertical-align: top;
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
  
  /* Two column layout */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 20px;
  }
  
  /* Clearfix */
  .clearfix::after {
    content: '';
    display: table;
    clear: both;
  }
  
  /* Footer */
  .footer {
    margin-top: 16px;
    padding-top: 10px;
    border-top: 2px solid #d97706;
    text-align: center;
  }
  
  .footer-ornament {
    color: #d97706;
    font-size: 18px;
    letter-spacing: 8px;
    display: block;
    margin-bottom: 4px;
  }
  
  .footer-text {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 10px;
    color: #92400e;
    opacity: 0.7;
  }
  
  .itar-mahiti {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 12px;
    color: #1c0a00;
    line-height: 1.8;
    padding: 6px 0;
  }
</style>
</head>
<body>
<div class="page">
  <div class="outer-border">
    <div class="inner-border">
      <div class="corner corner-tl">✿</div>
      <div class="corner corner-tr">✿</div>
      <div class="corner corner-bl">✿</div>
      <div class="corner corner-br">✿</div>

      <!-- Ganpati Header -->
      <div class="ganpati-header">
        <span class="ganesh-symbol">ॐ</span>
        <span class="ganesh-blessing">॥ श्री गणेशाय नमः ॥</span>
        <div class="gold-line"></div>
        ${isMarathi 
          ? `<span class="biodata-title-marathi">विवाह बायोडेटा</span>` 
          : `<span class="biodata-title">Marriage Biodata</span>`
        }
        ${lang === "bilingual" ? `<span class="biodata-title-marathi" style="font-size:14px;color:#b45309;">Marriage Biodata / विवाह बायोडेटा</span>` : ""}
        <div class="gold-line"></div>
      </div>

      <!-- Photo + Personal -->
      <div class="clearfix">
        ${data.photo ? `
        <div class="photo-wrapper">
          <div class="photo-frame">
            <div class="photo-frame-inner">
              <img src="${data.photo}" alt="Photo" />
            </div>
          </div>
        </div>` : ""}

        <!-- Personal Details -->
        <div class="section">
          <div class="section-title">${isMarathi ? "वैयक्तिक माहिती" : "Personal Details"}</div>
          <table>
            ${row("Name", "नाव", data.naam, lang)}
            ${row("Date of Birth", "जन्म तारीख", data.janmTarikh, lang)}
            ${row("Birth Time", "जन्म वेळ", data.janmVel, lang)}
            ${row("Birth Place", "जन्म ठिकाण", data.janmThikan, lang)}
            ${row("Height", "उंची", data.unchi, lang)}
            ${row("Complexion", "रंग", data.rang, lang)}
            ${row("Rashi", "राशी", data.rashi, lang)}
            ${row("Nakshatra", "नक्षत्र", data.nakshatra, lang)}
          </table>
        </div>
      </div>

      <!-- Education & Career -->
      <div class="section">
        <div class="section-title">${isMarathi ? "शिक्षण व व्यवसाय" : "Education & Career"}</div>
        <table>
          ${row("Education", "शिक्षण", data.shikshan, lang)}
          ${row("Occupation", "व्यवसाय", data.vyavsay, lang)}
          ${row("Annual Income", "वार्षिक उत्पन्न", data.varsikUtpanna, lang)}
          ${row("Work Place", "नोकरी ठिकाण", data.naukri, lang)}
        </table>
      </div>

      <!-- Family Details -->
      <div class="section">
        <div class="section-title">${isMarathi ? "कौटुंबिक माहिती" : "Family Details"}</div>
        <table>
          ${row("Gotra", "गोत्र", data.gotra, lang)}
          ${row("Kul", "कुल", data.kul, lang)}
          ${row("Mama's Surname", "मामा आडनाव", data.mamaAdnav, lang)}
          ${row("Father's Name", "वडिलांचे नाव", data.vadilanchNaav, lang)}
          ${row("Father's Occupation", "वडिलांचा व्यवसाय", data.vadilVyavsay, lang)}
          ${row("Mother's Name", "आईचे नाव", data.aaiChNaav, lang)}
          ${row("Brothers", "भाऊ", data.bhawaCount, lang)}
          ${row("Sisters", "बहीण", data.baheenCount, lang)}
        </table>
      </div>

      <!-- Contact Details -->
      <div class="section">
        <div class="section-title">${isMarathi ? "संपर्क माहिती" : "Contact Details"}</div>
        <table>
          ${row("Address", "पत्ता", data.patta, lang)}
          ${row("Phone", "संपर्क क्रमांक", data.samparkKramank, lang)}
          ${row("Email", "ईमेल", data.email, lang)}
        </table>
      </div>

      ${data.itarMahiti ? `
      <!-- Other Info -->
      <div class="section">
        <div class="section-title">${isMarathi ? "इतर माहिती" : "Other Information"}</div>
        <p class="itar-mahiti">${escapeHtml(data.itarMahiti)}</p>
      </div>` : ""}

      <!-- Footer -->
      <div class="footer">
        <span class="footer-ornament">❧ ❦ ❧</span>
        <p class="footer-text">
          ${isMarathi 
            ? "ResumeBiodata.in वर तयार केलेला बायोडेटा | Free Online Biodata Maker" 
            : "Created on ResumeBiodata.in | Free Marathi Biodata Maker"}
        </p>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

// Template 2: Royal Lotus (Free)
export function royalLotusTemplate(data: BiodataFormData): string {
  const lang = data.language || "marathi";
  const isMarathi = lang !== "english";

  return `<!DOCTYPE html>
<html lang="${isMarathi ? "mr" : "en"}">
<head>
<meta charset="UTF-8" />
<title>Biodata - ${escapeHtml(data.naam)}</title>
<link href="${GOOGLE_FONTS_URL}" rel="stylesheet" />
<style>
  @page { size: A4; margin: 10mm 12mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Noto Sans Devanagari', 'Cormorant Garamond', serif;
    background: #fff8f0;
    color: #1a0800;
  }
  .page {
    background: #fff8f0;
    position: relative;
    min-height: 277mm;
    overflow: hidden;
  }
  .bg-pattern {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(circle at 20px 20px, rgba(180,83,9,0.04) 2px, transparent 0),
                      radial-gradient(circle at 60px 60px, rgba(180,83,9,0.03) 2px, transparent 0);
    background-size: 80px 80px;
    pointer-events: none;
  }
  .header {
    background: linear-gradient(135deg, #7c2d12 0%, #9a3412 25%, #b45309 50%, #9a3412 75%, #7c2d12 100%);
    padding: 20px 24px;
    text-align: center;
    position: relative;
  }
  .header-om {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 28px;
    color: #fef3c7;
    display: block;
    margin-bottom: 2px;
  }
  .header-blessing {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 15px;
    color: #fde68a;
    display: block;
    letter-spacing: 3px;
    margin-bottom: 8px;
  }
  .header-title {
    font-size: 28px;
    color: white;
    font-weight: 700;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: 3px;
    display: block;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  .header-subtitle {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 16px;
    color: #fde68a;
    display: block;
    margin-top: 4px;
  }
  .content {
    padding: 16px 20px;
    display: grid;
    grid-template-columns: 1fr 90px;
    gap: 16px;
  }
  .main-content { flex: 1; }
  .photo-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
  }
  .photo-box {
    width: 88px;
    height: 110px;
    border: 3px solid #d97706;
    overflow: hidden;
    position: relative;
    box-shadow: 0 6px 20px rgba(180,83,9,0.3);
    border-radius: 2px;
  }
  .photo-box img { width: 100%; height: 100%; object-fit: cover; }
  .no-photo {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #b45309;
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
  .section { margin-bottom: 10px; }
  .sec-hd {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(90deg, #b45309, #d97706, #b45309);
    padding: 3px 10px;
    margin-bottom: 7px;
    letter-spacing: 1px;
    border-radius: 1px;
  }
  table { width: 100%; border-collapse: collapse; }
  .lbl {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-weight: 600;
    color: #7c2d12;
    width: 40%;
    padding: 2.5px 8px 2.5px 0;
    font-size: 11.5px;
    vertical-align: top;
  }
  .sep { width: 14px; color: #b45309; font-weight: 700; padding: 2.5px; vertical-align: top; font-size: 12px; }
  .val {
    font-family: 'Noto Sans Devanagari', sans-serif;
    color: #1a0800;
    padding: 2.5px 0;
    font-size: 11.5px;
    border-bottom: 1px solid rgba(251,191,36,0.4);
    vertical-align: top;
  }
  .footer {
    background: linear-gradient(90deg, #7c2d12, #b45309, #7c2d12);
    padding: 8px;
    text-align: center;
    margin-top: 10px;
  }
  .footer p { font-size: 9.5px; color: #fef3c7; font-family: 'Noto Sans Devanagari', sans-serif; }
</style>
</head>
<body>
<div class="page">
  <div class="bg-pattern"></div>

  <div class="header">
    <span class="header-om">ॐ श्री गणेशाय नमः ॐ</span>
    <span class="header-blessing">॥ शुभ विवाह ॥</span>
    ${isMarathi
      ? `<span class="header-title" style="font-family:'Noto Sans Devanagari',sans-serif;font-size:22px;">विवाह परिचय पत्रिका</span>`
      : `<span class="header-title">MARRIAGE BIODATA</span>`}
    ${lang === "bilingual" ? `<span class="header-subtitle">विवाह बायोडेटा</span>` : ""}
  </div>

  <div class="content">
    <div class="main-content">
      <div class="section">
        <div class="sec-hd">${isMarathi ? "▸ वैयक्तिक माहिती" : "▸ PERSONAL DETAILS"}</div>
        <table>
          ${row("Name", "नाव", data.naam, lang)}
          ${row("Date of Birth", "जन्म तारीख", data.janmTarikh, lang)}
          ${row("Birth Time", "जन्म वेळ", data.janmVel, lang)}
          ${row("Birth Place", "जन्म ठिकाण", data.janmThikan, lang)}
          ${row("Height", "उंची", data.unchi, lang)}
          ${row("Rashi / Nakshatra", "राशी / नक्षत्र", [data.rashi, data.nakshatra].filter(Boolean).join(" / "), lang)}
        </table>
      </div>

      <div class="section">
        <div class="sec-hd">${isMarathi ? "▸ शिक्षण व व्यवसाय" : "▸ EDUCATION & CAREER"}</div>
        <table>
          ${row("Education", "शिक्षण", data.shikshan, lang)}
          ${row("Occupation", "व्यवसाय", data.vyavsay, lang)}
          ${row("Annual Income", "वार्षिक उत्पन्न", data.varsikUtpanna, lang)}
        </table>
      </div>

      <div class="section">
        <div class="sec-hd">${isMarathi ? "▸ कौटुंबिक माहिती" : "▸ FAMILY DETAILS"}</div>
        <table>
          ${row("Gotra", "गोत्र", data.gotra, lang)}
          ${row("Mama's Surname", "मामा आडनाव", data.mamaAdnav, lang)}
          ${row("Father's Name", "वडिलांचे नाव", data.vadilanchNaav, lang)}
          ${row("Father's Job", "वडिलांचा व्यवसाय", data.vadilVyavsay, lang)}
          ${row("Mother's Name", "आईचे नाव", data.aaiChNaav, lang)}
          ${row("Brothers", "भाऊ", data.bhawaCount, lang)}
          ${row("Sisters", "बहीण", data.baheenCount, lang)}
        </table>
      </div>

      <div class="section">
        <div class="sec-hd">${isMarathi ? "▸ संपर्क माहिती" : "▸ CONTACT DETAILS"}</div>
        <table>
          ${row("Address", "पत्ता", data.patta, lang)}
          ${row("Phone", "संपर्क क्रमांक", data.samparkKramank, lang)}
          ${row("Email", "ईमेल", data.email, lang)}
        </table>
      </div>

      ${data.itarMahiti ? `
      <div class="section">
        <div class="sec-hd">${isMarathi ? "▸ इतर माहिती" : "▸ OTHER INFORMATION"}</div>
        <p style="font-family:'Noto Sans Devanagari',sans-serif;font-size:11.5px;line-height:1.7;color:#1a0800;padding:4px 0;">${escapeHtml(data.itarMahiti)}</p>
      </div>` : ""}
    </div>

    <!-- Photo Column -->
    <div class="photo-col">
      <div class="photo-box">
        ${data.photo 
          ? `<img src="${data.photo}" alt="Photo" />`
          : `<div class="no-photo">ॐ</div>`}
      </div>
    </div>
  </div>

  <div class="footer">
    <p>ResumeBiodata.in | Free Marathi Biodata Maker | मोफत बायोडेटा निर्माता</p>
  </div>
</div>
</body>
</html>`;
}

// Main selector function
export function generateBiodataHTML(data: BiodataFormData): string {
  switch (data.template) {
    case "royal-lotus":
      return royalLotusTemplate(data);
    case "ganpati-classic":
    default:
      return ganpatiClassicTemplate(data);
  }
}
