import { createBot } from "./bot.js";
import { startHealthServer } from "./health.js";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is not set. Get a token from @BotFather and add it to the environment.");
  process.exit(1);
}

const port = Number(process.env.PORT ?? 8080);
// Optional: point at a self-hosted Bot API server.
const apiRoot = process.env.TELEGRAM_API_ROOT || undefined;

const bot = createBot(token, apiRoot ? { client: { apiRoot } } : {});
let state = "starting";
const server = startHealthServer(port, () => state);

// Long polling. Only one copy of the bot may poll at a time, so run it with
// minScale 1 and maxScale 1 on Grro. Start errors (bad token, network) are retried.
async function run() {
  for (let delay = 2000; ; delay = Math.min(delay * 2, 60000)) {
    try {
      await bot.start({
        drop_pending_updates: false,
        onStart: (me) => {
          state = "polling";
          delay = 2000;
          console.log(`Bot @${me.username} is polling for updates`);
        },
      });
      return; // bot.stop() was called
    } catch (err) {
      state = "error";
      console.error(`Bot failed: ${err.message}. Retrying in ${delay / 1000}s`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

run();

async function shutdown() {
  state = "stopping";
  await bot.stop();
  server.close(() => process.exit(0));
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
