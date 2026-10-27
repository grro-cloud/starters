import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "there";
  return Response.json({ message: `Hello ${name}, from Next.js on Grro.` });
}
