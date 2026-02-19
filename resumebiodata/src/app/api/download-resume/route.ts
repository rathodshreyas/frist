import { NextRequest, NextResponse } from "next/server";
import { htmlToPDF, createPDFResponse } from "@/lib/pdf-generator";
import { generateResumeHTML } from "@/lib/resume-templates";
import { ResumeFormData } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body: ResumeFormData = await req.json();

    if (!body?.personalDetails?.fullName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 }
      );
    }

    if (["minimal-premium", "executive-premium"].includes(body.template)) {
      const token = req.headers.get("x-premium-token");
      if (!token) {
        return NextResponse.json(
          { success: false, error: "Premium template requires unlock", code: "PREMIUM_REQUIRED" },
          { status: 403 }
        );
      }
    }

    const html = generateResumeHTML(body);
    const pdfBuffer = await htmlToPDF(html);
    const filename = `${body.personalDetails.fullName}_Resume`;

    return createPDFResponse(pdfBuffer, filename);
  } catch (err) {
    console.error("[download-resume] error:", err);
    return NextResponse.json(
      { success: false, error: "PDF generation failed. Please try again." },
      { status: 500 }
    );
  }
}
