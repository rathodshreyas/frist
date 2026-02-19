import { NextRequest, NextResponse } from "next/server";
import { htmlToPDF, createPDFResponse } from "@/lib/pdf-generator";
import { generateBiodataHTML } from "@/lib/biodata-template";
import { BiodataFormData } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, templateId = "ganpati" } = body as {
      data: BiodataFormData;
      templateId: string;
    };

    if (!data || !data.naam) {
      return NextResponse.json({ error: "Biodata data is required" }, { status: 400 });
    }

    // Sanitize inputs
    const sanitized: BiodataFormData = {
      naam: String(data.naam || "").slice(0, 100),
      janmTarikh: String(data.janmTarikh || "").slice(0, 50),
      janmVel: String(data.janmVel || "").slice(0, 50),
      janmThikan: String(data.janmThikan || "").slice(0, 100),
      unchi: String(data.unchi || "").slice(0, 20),
      rang: String(data.rang || "").slice(0, 50),
      shikshan: String(data.shikshan || "").slice(0, 200),
      vyavsay: String(data.vyavsay || "").slice(0, 100),
      varsikUtpanna: String(data.varsikUtpanna || "").slice(0, 50),
      gotra: String(data.gotra || "").slice(0, 100),
      mamaAdnav: String(data.mamaAdnav || "").slice(0, 100),
      vadilanchNaav: String(data.vadilanchNaav || "").slice(0, 100),
      vadilVyavsay: String(data.vadilVyavsay || "").slice(0, 100),
      aaiChNaav: String(data.aaiChNaav || "").slice(0, 100),
      bhawaLagna: String(data.bhawaLagna || "").slice(0, 100),
      baheenLagna: String(data.baheenLagna || "").slice(0, 100),
      patta: String(data.patta || "").slice(0, 300),
      samparkKramank: String(data.samparkKramank || "").slice(0, 20),
      email: String(data.email || "").slice(0, 100),
      itarMahiti: String(data.itarMahiti || "").slice(0, 500),
      photo: data.photo?.startsWith("data:image/") ? data.photo : undefined,
      language: data.language || "marathi",
    };

    const html = generateBiodataHTML(sanitized, templateId);
    const pdfBuffer = await htmlToPDF(html);
    const filename = `${sanitized.naam.replace(/[^a-zA-Z\u0900-\u097F ]/g, "")}_Biodata`;

    return createPDFResponse(pdfBuffer, filename);
  } catch (error) {
    console.error("Biodata PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF. Please try again." },
      { status: 500 }
    );
  }
}
