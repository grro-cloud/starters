import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { commands, handleInteraction } from "../commands.js";

function fakeInteraction(name) {
  const replies = [];
  return {
    replies,
    commandName: name,
    createdTimestamp: Date.now(),
    replied: false,
    deferred: false,
    isChatInputCommand: () => true,
    reply: async (msg) => replies.push(msg),
    followUp: async (msg) => replies.push(msg),
  };
}

test("/ping is defined as a slash command", () => {
  const json = commands.map((c) => c.data.toJSON());
  assert.deepEqual(json.map((c) => c.name), ["ping"]);
});

test("/ping replies with pong", async () => {
  const i = fakeInteraction("ping");
  await handleInteraction(i);
  assert.match(i.replies[0], /^Pong!/);
});

test("unknown commands are ignored", async () => {
  const i = fakeInteraction("nope");
  await handleInteraction(i);
  assert.equal(i.replies.length, 0);
});

// Smoke: with a fake token the bot cannot log in, but the health server must still answer.
let proc;
const port = 18000 + Math.floor(Math.random() * 900);

before(async () => {
  proc = spawn(process.execPath, ["main.js"], {
    env: { ...process.env, PORT: String(port), DISCORD_TOKEN: "fake", DISCORD_CLIENT_ID: "1" },
    stdio: "ignore",
  });
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}/healthz`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
});

after(async () => {
  proc.kill("SIGTERM");
  await once(proc, "exit");
});

test("GET /healthz returns 200", async () => {
  const res = await fetch(`http://127.0.0.1:${port}/healthz`);
  assert.equal(res.status, 200);
});
