import { Bot } from "grammy";

// All bot behaviour lives here. Add commands with bot.command() and
// other handlers with bot.on(). See https://grammy.dev for the full API.
export function createBot(token, options = {}) {
  const bot = new Bot(token, options);

  bot.command("start", (ctx) =>
    ctx.reply("Hi! I am a grammY bot running on Grro. Send /ping or any text and I will echo it."),
  );

  bot.command("ping", (ctx) => ctx.reply("pong"));

  bot.on("message:text", (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

  bot.catch((err) => {
    console.error(`Error while handling update ${err.ctx.update.update_id}:`, err.error);
  });

  return bot;
}
