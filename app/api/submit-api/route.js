import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const formData = await request.json();

    const { data, error } = await supabase.from("api_submissions").insert([
      {
        name: formData.name,
        description: formData.description,
        api_base_url: formData.apiBaseUrl,
        docs_url: formData.docsUrl,
        website_url: formData.websiteUrl,
        tags: formData.tags,
        sample_endpoint: formData.sampleEndpoint,
        contact_email: formData.contactEmail,
      },
    ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "API submitted successfully",
      data,
    });
  } catch (error) {
    console.error("Error submitting API:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
