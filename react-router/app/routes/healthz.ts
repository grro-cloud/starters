// A resource route: no component, so it answers with the loader's Response.
export function loader() {
  return Response.json({ status: "ok" });
}
