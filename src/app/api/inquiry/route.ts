import { NextResponse } from "next/server";

type InquiryBody = {
  propertyId?: string;
  propertyTitle?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryBody;
  if (!body.propertyId || !body.name || !body.email || !body.phone || !body.preferredDate) {
    return NextResponse.json({ error: "Missing required inquiry fields" }, { status: 400 });
  }

  console.log("property_inquiry", {
    ...body,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
