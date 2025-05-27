// handlers_textHandler.js
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const { getTextsByLanguage } = require("../utils_sheets");

module.exports = {
handleLanguageSelection: async (interaction) => {
if (!interaction.customId.startsWith("lang_")) return;
const language = interaction.customId.replace("lang_", "");

try {
  const texts = await getTextsByLanguage(language);
  if (!texts.length) return interaction.reply({ content: `❌ No texts found for **${language}**.`, ephemeral: true });

  const random = texts[Math.floor(Math.random() * texts.length)];
  const embed = new EmbedBuilder()
    .setTitle(`📝 Reading (${language})`)
    .setDescription(random.text)
    .setColor("Green");

  await interaction.channel.send({
    embeds: [embed],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("submit_corrections").setLabel("Submit Corrections").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("pass_turn").setLabel("Pass Turn").setStyle(ButtonStyle.Danger)
      )
    ]
  });
  await interaction.deferUpdate();
} catch (err) {
  console.error("Error fetching texts:", err);
  return interaction.reply({ content: `⚠️ Error retrieving texts.`, ephemeral: true });
}

},

handleCustomTextModal: async (interaction) => {
if (interaction.customId !== "custom_text_modal") return;
const text = interaction.fields.getTextInputValue("custom_text_input");
await interaction.channel.send({
embeds: [
new EmbedBuilder()
.setTitle("📩 Custom Text Submitted")
.setDescription(text)
.setColor("Purple")
]
});
await interaction.deferUpdate();
}
};