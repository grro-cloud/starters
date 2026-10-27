import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>React is running on Grro</h1>
      <p>
        A static React app built with Vite and served by nginx. Edit <code>src/App.tsx</code> to change
        this page.
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>
    </main>
  );
}
