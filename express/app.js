import express from "express";

export const app = express();

app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express.json());
app.use(express.static("public"));

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/hello", (req, res) => {
  const name = req.query.name ?? "there";
  res.json({ message: `Hello ${name}, from Express on Grro.` });
});
