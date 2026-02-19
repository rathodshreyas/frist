import { NextRequest, NextResponse } from "next/server";
import { htmlToPDF, createPDFResponse } from "@/lib/pdf-generator";
import { generateResumeHTML } from "@/lib/resume-template";
import { ResumeFormData } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, templateId = "modern" } = body as {
      data: ResumeFormData;
      templateId: string;
    };

    if (!data || !data.personalDetails?.fullName) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 });
    }

    const html = generateResumeHTML(data, templateId);
    const pdfBuffer = await htmlToPDF(html);
    const filename = `${data.personalDetails.fullName.replace(/[^a-zA-Z ]/g, "")}_Resume`;

    return createPDFResponse(pdfBuffer, filename);
  } catch (error) {
    console.error("Resume PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF. Please try again." },
      { status: 500 }
    );
  }
}
