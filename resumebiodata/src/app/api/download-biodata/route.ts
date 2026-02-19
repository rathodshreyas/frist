import { NextRequest, NextResponse } from "next/server";
import { htmlToPDF, createPDFResponse } from "@/lib/pdf-generator";
import { generateBiodataHTML } from "@/lib/biodata-templates";
import { BiodataFormData } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function sanitize(raw: Partial<BiodataFormData>): BiodataFormData {
  const s = (v: unknown, max = 200) => String(v || "").slice(0, max).trim();
  return {
    naam: s(raw.naam, 100),
    janmTarikh: s(raw.janmTarikh, 60),
    janmVel: s(raw.janmVel, 60),
    janmThikan: s(raw.janmThikan, 100),
    unchi: s(raw.unchi, 30),
    vajan: s(raw.vajan, 30),
    rang: s(raw.rang, 50),
    rashi: s(raw.rashi, 50),
    nakshatra: s(raw.nakshatra, 50),
    shikshan: s(raw.shikshan, 300),
    vyavsay: s(raw.vyavsay, 150),
    varsikUtpanna: s(raw.varsikUtpanna, 60),
    naukri: s(raw.naukri, 150),
    gotra: s(raw.gotra, 100),
    kul: s(raw.kul, 100),
    mamaAdnav: s(raw.mamaAdnav, 100),
    vadilanchNaav: s(raw.vadilanchNaav, 100),
    vadilVyavsay: s(raw.vadilVyavsay, 150),
    aaiChNaav: s(raw.aaiChNaav, 100),
    bhawaCount: s(raw.bhawaCount, 50),
    baheenCount: s(raw.baheenCount, 50),
    patta: s(raw.patta, 400),
    samparkKramank: s(raw.samparkKramank, 20),
    email: s(raw.email, 100),
    itarMahiti: s(raw.itarMahiti, 800),
    expectations: s(raw.expectations, 400),
    photo:
      typeof raw.photo === "string" && raw.photo.startsWith("data:image/")
        ? raw.photo
        : undefined,
    language: (["marathi", "english", "bilingual"] as const).includes(
      raw.language as "marathi"
    )
      ? (raw.language as "marathi" | "english" | "bilingual")
      : "marathi",
    template: s(raw.template, 50) || "ganpati-classic",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = sanitize(body);

    if (!data.naam) {
      return NextResponse.json(
        { success: false, error: "नाव (Name) आवश्यक आहे" },
        { status: 400 }
      );
    }

    // Premium check
    if (["premium-mandala", "premium-floral"].includes(data.template)) {
      const token = req.headers.get("x-premium-token");
      if (!token) {
        return NextResponse.json(
          { success: false, error: "Premium template साठी unlock आवश्यक आहे", code: "PREMIUM_REQUIRED" },
          { status: 403 }
        );
      }
    }

    const html = generateBiodataHTML(data);
    const pdfBuffer = await htmlToPDF(html);
    const filename = `${data.naam}_Marriage_Biodata`;

    return createPDFResponse(pdfBuffer, filename);
  } catch (err) {
    console.error("[download-biodata] error:", err);
    return NextResponse.json(
      { success: false, error: "PDF generate करताना error झाला. पुन्हा प्रयत्न करा." },
      { status: 500 }
    );
  }
}
