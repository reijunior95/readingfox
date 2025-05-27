// registerCommands.js → registra os comandos do bot com a API do Discord
/core/setupInteractions.js → registra todos os listeners de interação

/handlers/queueHandler.js → lógica para fila: join, leave, passar turno
/handlers/textHandler.js → lógica para sortear textos por idioma ou enviar personalizado
/handlers/correctionsHandler.js → lógica de sugestões de correção e exibição

/components/embedFactory.js → funções utilitárias para gerar Embeds com padrão visual
/components/buttonFactory.js → funções para montar botões interativos por contexto

/utils_sheets.js → função getTextsByLanguage() (mantido como está)
*/

// core/registerCommands.js
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

module.exports = async function registerCommands() {
const commands = [
new SlashCommandBuilder()
.setName("queue")
.setDescription("Start a new practice queue")
.toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
try {
await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
console.log("✅ Slash commands registered.");
} catch (err) {
console.error("❌ Error registering commands:", err);
}
};
