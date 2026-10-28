import type { Route } from "./+types/api.hello";

export function loader({ request }: Route.LoaderArgs) {
  const name = (new URL(request.url).searchParams.get("name") ?? "there").slice(0, 100);
  return Response.json({ message: `Hello ${name}, from React Router on Grro.` });
}
