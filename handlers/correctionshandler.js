// handlers_correctionsHandler.js
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

const corrections = {};

module.exports = {
handleButtons: async (interaction) => {
if (interaction.customId !== "submit_corrections") return;

const modal = new ModalBuilder()
  .setCustomId("corrections_modal")
  .setTitle("Submit Corrections")
  .addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("corrections_input")
        .setLabel("Your corrections")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
    )
  );

await interaction.showModal(modal);

},

handleCorrectionModal: async (interaction) => {
if (interaction.customId !== "corrections_modal") return;

const text = interaction.fields.getTextInputValue("corrections_input");
const username = interaction.user.username;
if (!corrections[username]) corrections[username] = [];
corrections[username].push(text);

const embed = new EmbedBuilder()
  .setTitle("✅ Corrections Submitted")
  .setColor("DarkGreen");

for (const [user, entries] of Object.entries(corrections)) {
  embed.addFields({ name: `@${user} suggests:`, value: entries.join("\n"), inline: false });
}

await interaction.channel.send({ embeds: [embed] });
await interaction.deferUpdate();

}
};

