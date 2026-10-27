import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { commands, handleInteraction } from "./commands.js";
import { startHealthServer } from "./health.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID; // optional: register in one server, updates show instantly

if (!token || !clientId) {
  console.error("DISCORD_TOKEN and DISCORD_CLIENT_ID must be set. Find both in the Discord developer portal.");
  process.exit(1);
}

const port = Number(process.env.PORT ?? 8080);
let state = "starting";
let client;
const server = startHealthServer(port, () => state);

async function registerCommands() {
  const rest = new REST().setToken(token);
  const body = commands.map((c) => c.data.toJSON());
  const route = guildId ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId);
  await rest.put(route, { body });
  console.log(`Registered ${body.length} slash command(s) ${guildId ? `in guild ${guildId}` : "globally"}`);
}

async function connect() {
  client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.once(Events.ClientReady, (c) => {
    state = "ready";
    console.log(`Logged in as ${c.user.tag}`);
  });
  client.on(Events.InteractionCreate, handleInteraction);
  try {
    await client.login(token);
  } catch (err) {
    await client.destroy();
    throw err;
  }
}

// Register commands, then connect to the gateway. Errors (bad token, network) are retried.
async function run() {
  for (let delay = 2000; ; delay = Math.min(delay * 2, 60000)) {
    try {
      await registerCommands();
      await connect();
      return;
    } catch (err) {
      state = "error";
      console.error(`Bot failed to start: ${err.message}. Retrying in ${delay / 1000}s`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

run();

async function shutdown() {
  state = "stopping";
  await client?.destroy();
  server.close(() => process.exit(0));
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
