// Runs the real bot against a fake Telegram Bot API server and checks the replies
// and the health endpoint. No network or real token needed.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { once } from "node:events";

const sent = [];
let updates = [
  { update_id: 1, message: { message_id: 1, date: 0, chat: { id: 42, type: "private" }, from: { id: 42, is_bot: false, first_name: "Ada" }, text: "/ping", entities: [{ type: "bot_command", offset: 0, length: 5 }] } },
  { update_id: 2, message: { message_id: 2, date: 0, chat: { id: 42, type: "private" }, from: { id: 42, is_bot: false, first_name: "Ada" }, text: "hello" } },
];

const fakeApi = createServer(async (req, res) => {
  let body = "";
  for await (const chunk of req) body += chunk;
  const params = body ? JSON.parse(body) : {};
  const method = req.url.split("/").pop();
  let result = true;
  if (method === "getMe") result = { id: 1, is_bot: true, first_name: "Test", username: "test_bot" };
  if (method === "getUpdates") {
    result = updates;
    updates = [];
    if (result.length === 0) await new Promise((r) => setTimeout(r, 200));
  }
  if (method === "sendMessage") {
    sent.push(params);
    result = { message_id: 100 + sent.length, date: 0, chat: { id: params.chat_id, type: "private" }, text: params.text };
  }
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ ok: true, result }));
});

let bot;
const port = 18000 + Math.floor(Math.random() * 900);

before(async () => {
  fakeApi.listen(0, "127.0.0.1");
  await once(fakeApi, "listening");
  bot = spawn(process.execPath, ["main.js"], {
    env: { ...process.env, PORT: String(port), TELEGRAM_BOT_TOKEN: "123:test", TELEGRAM_API_ROOT: `http://127.0.0.1:${fakeApi.address().port}` },
    stdio: "inherit",
  });
  for (let i = 0; i < 50 && sent.length < 2; i++) await new Promise((r) => setTimeout(r, 100));
});

after(async () => {
  bot.kill("SIGTERM");
  await once(bot, "exit");
  fakeApi.close();
  fakeApi.closeAllConnections();
});

test("replies to /ping and echoes text", () => {
  assert.deepEqual(sent.map((m) => m.text), ["pong", "You said: hello"]);
});

test("GET /healthz returns 200", async () => {
  const res = await fetch(`http://127.0.0.1:${port}/healthz`);
  assert.equal(res.status, 200);
  const info = await (await fetch(`http://127.0.0.1:${port}/`)).json();
  assert.equal(info.bot, "polling");
});
