import { useState } from "react";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: "React Router on Grro" }];
}

// Runs on the server for every request, so the page shows server rendering at work.
export function loader(_: Route.LoaderArgs) {
  return { renderedAt: new Date().toISOString(), region: process.env.GRRO_REGION ?? "local" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>React Router is running on Grro</h1>
      <p>
        This page was rendered on the server at <code>{loaderData.renderedAt}</code> in region{" "}
        <code>{loaderData.region}</code>. Edit <code>app/routes/home.tsx</code> to change it, or try{" "}
        <a href="/api/hello?name=Ada">/api/hello</a>.
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>
    </main>
  );
}
