// components_embedFactory.js
const { EmbedBuilder } = require("discord.js");

module.exports = {
createReadingEmbed: (language, text) => {
return new EmbedBuilder()
+ .setTitle(`📝 Reading (${language})`)
.setDescription(text)
.setColor("Green");
},

createCustomTextEmbed: (text) => {
return new EmbedBuilder()
.setTitle("📩 Custom Text Submitted")
.setDescription(text)
.setColor("Purple");
},

createCorrectionsEmbed: (corrections) => {
const embed = new EmbedBuilder()
.setTitle("✅ Corrections Submitted")
.setColor("DarkGreen");

for (const [user, entries] of Object.entries(corrections)) {
  embed.addFields({ name: `@${user} suggests:`, value: entries.join("\n"), inline: false });
}
return embed;

}
};