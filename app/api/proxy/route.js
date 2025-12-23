import { NextResponse } from "next/server";

const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");

  if (!target) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  if (!isHttpUrl(target)) {
    return NextResponse.json(
      { error: "Invalid url. Only http/https are allowed." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(target, {
      cache: "no-store",
      headers: {
        Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
      },
    });

    const contentType = upstream.headers.get("content-type") || "";
    const rawBody = await upstream.text();

    let body;
    if (contentType.includes("application/json")) {
      body = rawBody ? JSON.parse(rawBody) : {};
    } else {
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = { data: rawBody };
      }
    }

    return NextResponse.json(body, { status: upstream.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch upstream API." },
      { status: 502 }
    );
  }
}

