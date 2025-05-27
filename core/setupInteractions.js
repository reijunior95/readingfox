// core/setupInteractions.js
const { Events } = require("discord.js");
const handleQueue = require("../handlers/queuehandler");
const handleText = require("../handlers/texthandler");
const handleCorrections = require("../handlers/correctionshandler");

module.exports = function setupInteractions(client) {
client.on(Events.InteractionCreate, async (interaction) => {
if (interaction.isChatInputCommand() && interaction.commandName === "queue") {
await handleQueue.startQueue(interaction);
} else if (interaction.isButton()) {
await handleQueue.handleButtons(interaction);
await handleText.handleLanguageSelection(interaction);
await handleCorrections.handleButtons(interaction);
} else if (interaction.isModalSubmit()) {
await handleText.handleCustomTextModal(interaction);
await handleCorrections.handleCorrectionModal(interaction);
}
});
};
