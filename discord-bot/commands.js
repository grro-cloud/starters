import { MessageFlags, SlashCommandBuilder } from "discord.js";

// Each command has a definition (sent to Discord on startup) and a handler.
// Add a new object to this list to add a command.
export const commands = [
  {
    data: new SlashCommandBuilder().setName("ping").setDescription("Check that the bot is alive"),
    async execute(interaction) {
      const ms = Date.now() - interaction.createdTimestamp;
      await interaction.reply(`Pong! (${ms} ms, running on Grro)`);
    },
  },
];

export const commandsByName = new Map(commands.map((c) => [c.data.name, c]));

export async function handleInteraction(interaction) {
  if (!interaction.isChatInputCommand()) return;
  const command = commandsByName.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Command /${interaction.commandName} failed:`, err);
    const reply = { content: "Something went wrong.", flags: MessageFlags.Ephemeral };
    if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
    else await interaction.reply(reply);
  }
}
