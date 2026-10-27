/**
 * Your function lives here.
 *
 * Grro calls the default export for every HTTP request. It gets a standard web
 * Request and returns a Response (or a promise of one), the same shape used by
 * fetch(), so code moves easily between platforms.
 */
export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname === "/healthz") {
    return Response.json({ status: "ok" });
  }

  if (url.pathname === "/") {
    const name = url.searchParams.get("name") ?? "there";
    return Response.json({
      message: `Hello ${name}, this TypeScript function is running on Grro.`,
      method: req.method,
    });
  }

  if (url.pathname === "/echo" && req.method === "POST") {
    return new Response(await req.text(), {
      headers: { "content-type": req.headers.get("content-type") ?? "text/plain" },
    });
  }

  return Response.json({ error: "not found", path: url.pathname }, { status: 404 });
}
