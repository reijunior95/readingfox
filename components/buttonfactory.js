// components_buttonFactory.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
getLanguageButtons: () => [
new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("lang_english").setLabel("English").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("lang_spanish").setLabel("Spanish").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("lang_french").setLabel("French").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId("lang_portuguese").setLabel("Portuguese").setStyle(ButtonStyle.Primary)
),
new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("submit_custom_text").setLabel("Submit My Own Text").setStyle(ButtonStyle.Secondary),
new ButtonBuilder().setCustomId("pass_turn").setLabel("Pass Turn").setStyle(ButtonStyle.Danger)
)
],

getAfterTextButtons: () => new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("submit_corrections").setLabel("Submit Corrections").setStyle(ButtonStyle.Success),
new ButtonBuilder().setCustomId("pass_turn").setLabel("Pass Turn").setStyle(ButtonStyle.Danger)
),

getQueueButtons: () => new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("join").setLabel("Join").setStyle(ButtonStyle.Success),
new ButtonBuilder().setCustomId("leave").setLabel("Leave").setStyle(ButtonStyle.Danger),
new ButtonBuilder().setCustomId("instructions").setLabel("Instructions").setStyle(ButtonStyle.Primary)
)
};

