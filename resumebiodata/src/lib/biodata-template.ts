import { BiodataFormData } from "@/types";

export function generateBiodataHTML(data: BiodataFormData, templateId: string): string {
  const isMarathi = data.language === "marathi" || data.language === "bilingual";

  const templates: Record<string, string> = {
    ganpati: "ganpati",
    traditional: "traditional",
    modern: "modern",
  };
  const tpl = templates[templateId] || "ganpati";

  const photoSection = data.photo
    ? `<div style="text-align:center;margin-bottom:16px;">
        <img src="${data.photo}" alt="Photo" style="width:110px;height:130px;object-fit:cover;border-radius:4px;border:3px solid #ca8a04;" />
       </div>`
    : "";

  const ganpatiHeader = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:32px;color:#ca8a04;margin-bottom:4px;">🙏</div>
      <div style="font-family:'Noto Sans Devanagari',serif;font-size:22px;color:#a16207;font-weight:700;letter-spacing:2px;">
        ॥ श्री गणेशाय नम: ॥
      </div>
      <div style="height:2px;background:linear-gradient(90deg,transparent,#ca8a04,transparent);margin:12px auto;width:80%;"></div>
      <div style="font-size:28px;font-weight:700;font-family:'Playfair Display',serif;color:#1a1a1a;margin-bottom:4px;">
        ${isMarathi ? "विवाह बायोडेटा" : "Marriage Biodata"}
      </div>
      <div style="height:1px;background:linear-gradient(90deg,transparent,#ca8a04,transparent);margin:8px auto;width:60%;"></div>
    </div>`;

  const row = (label: string, value: string, marathiLabel?: string) => {
    if (!value) return "";
    const displayLabel = isMarathi && marathiLabel ? marathiLabel : label;
    return `
      <tr>
        <td style="font-weight:600;color:#854d0e;padding:7px 12px 7px 0;width:40%;font-size:13px;vertical-align:top;white-space:nowrap;">${displayLabel}</td>
        <td style="color:#3a2a00;padding:7px 0;font-size:13px;border-bottom:1px dashed #fde68a;vertical-align:top;">: ${value}</td>
      </tr>`;
  };

  return `<!DOCTYPE html>
<html lang="${isMarathi ? "mr" : "en"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${data.naam || "Biodata"} - Marriage Biodata</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 20mm 18mm 20mm 18mm; }
  body {
    font-family: ${isMarathi ? "'Noto Sans Devanagari'" : "'Lato'"}, 'Playfair Display', serif;
    background: #fffdf0;
    color: #1a0a00;
    font-size: 13px;
    line-height: 1.6;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: #fffdf0;
    padding: 20mm 18mm;
    position: relative;
  }
  .border-frame {
    border: 3px double #ca8a04;
    border-radius: 8px;
    padding: 24px;
    min-height: 257mm;
    background: linear-gradient(135deg, #fffdf0 0%, #fefce8 100%);
    position: relative;
  }
  .border-frame::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid #fbbf24;
    border-radius: 4px;
    pointer-events: none;
  }
  .corner { position: absolute; width: 20px; height: 20px; }
  .corner-tl { top: 2px; left: 2px; border-top: 3px solid #ca8a04; border-left: 3px solid #ca8a04; }
  .corner-tr { top: 2px; right: 2px; border-top: 3px solid #ca8a04; border-right: 3px solid #ca8a04; }
  .corner-bl { bottom: 2px; left: 2px; border-bottom: 3px solid #ca8a04; border-left: 3px solid #ca8a04; }
  .corner-br { bottom: 2px; right: 2px; border-bottom: 3px solid #ca8a04; border-right: 3px solid #ca8a04; }
  .section-title {
    font-family: 'Noto Sans Devanagari', 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: #ca8a04;
    border-bottom: 2px solid #fde68a;
    padding-bottom: 4px;
    margin: 20px 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  table { width: 100%; border-collapse: collapse; }
  .photo-section { float: right; margin: 0 0 16px 20px; }
  .clearfix::after { content: ''; display: table; clear: both; }
  .footer-divider { height: 1px; background: linear-gradient(90deg,transparent,#ca8a04,transparent); margin: 20px 0 12px 0; }
  .footer-text { text-align: center; font-size: 11px; color: #a16207; font-family: 'Noto Sans Devanagari', serif; }
</style>
</head>
<body>
<div class="page">
  <div class="border-frame">
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    ${ganpatiHeader}

    <div class="clearfix">
      ${data.photo ? `<div class="photo-section">${photoSection}</div>` : ""}

      <!-- Personal Details -->
      <div class="section-title">${isMarathi ? "वैयक्तिक माहिती" : "Personal Details"}</div>
      <table>
        ${row("Full Name", data.naam, "नाव")}
        ${row("Date of Birth", data.janmTarikh, "जन्म तारीख")}
        ${row("Birth Time", data.janmVel, "जन्म वेळ")}
        ${row("Birth Place", data.janmThikan, "जन्म ठिकाण")}
        ${row("Height", data.unchi, "उंची")}
        ${row("Complexion", data.rang, "रंग")}
      </table>
    </div>

    <!-- Education & Career -->
    <div class="section-title">${isMarathi ? "शिक्षण व व्यवसाय" : "Education & Career"}</div>
    <table>
      ${row("Education", data.shikshan, "शिक्षण")}
      ${row("Occupation", data.vyavsay, "व्यवसाय")}
      ${row("Annual Income", data.varsikUtpanna, "वार्षिक उत्पन्न")}
    </table>

    <!-- Family Details -->
    <div class="section-title">${isMarathi ? "कौटुंबिक माहिती" : "Family Details"}</div>
    <table>
      ${row("Gotra", data.gotra, "गोत्र")}
      ${row("Mama's Surname", data.mamaAdnav, "मामा आडनाव")}
      ${row("Father's Name", data.vadilanchNaav, "वडिलांचे नाव")}
      ${row("Father's Occupation", data.vadilVyavsay, "वडिलांचा व्यवसाय")}
      ${row("Mother's Name", data.aaiChNaav, "आईचे नाव")}
      ${row("Brothers (Married)", data.bhawaLagna, "भाऊ (लग्न)")}
      ${row("Sisters (Married)", data.baheenLagna, "बहीण (लग्न)")}
    </table>

    <!-- Contact Details -->
    <div class="section-title">${isMarathi ? "संपर्क माहिती" : "Contact Information"}</div>
    <table>
      ${row("Address", data.patta, "पत्ता")}
      ${row("Contact Number", data.samparkKramank, "संपर्क क्रमांक")}
      ${row("Email", data.email, "इमेल")}
    </table>

    ${data.itarMahiti ? `
    <div class="section-title">${isMarathi ? "इतर माहिती" : "Other Information"}</div>
    <p style="font-size:13px;color:#3a2a00;line-height:1.7;">${data.itarMahiti}</p>
    ` : ""}

    <div class="footer-divider"></div>
    <div class="footer-text">
      ${isMarathi
        ? "ResumeBiodata.in वर तयार केलेला बायोडेटा | मोफत ऑनलाइन बायोडेटा निर्माता"
        : "Biodata created on ResumeBiodata.in | Free Online Biodata Maker"}
    </div>
  </div>
</div>
</body>
</html>`;
}
