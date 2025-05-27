const { Events } = require("discord.js");
const handleQueue = require("../handlers/queueHandler");
const handleText = require("../handlers/texthandler");
const handleCorrections = require("../handlers/correctionshandler");

module.exports = function setupInteractions(client) {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isChatInputCommand() && interaction.commandName === "queue") {
        await handleQueue.startQueue(interaction);
      } else if (interaction.isButton()) {
        const id = interaction.customId;

        if (["join", "leave", "instructions", "pass_turn"].includes(id)) {
          await handleQueue.handleButtons(interaction);
        } else if (id.startsWith("lang_")) {
          await handleText.handleLanguageSelection(interaction);
        } else if (id === "submit_corrections") {
          await handleCorrections.handleButtons(interaction);
        }
      } else if (interaction.isModalSubmit()) {
        if (interaction.customId === "custom_text_modal") {
          await handleText.handleCustomTextModal(interaction);
        } else if (interaction.customId === "corrections_modal") {
          await handleCorrections.handleCorrectionModal(interaction);
        }
      }
    } catch (err) {
      console.error("❌ Interaction error:", err);
    }
  });
};
