// handlers/queueHandler.js
const { ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

const queue = [];

module.exports = {
startQueue: async (interaction) => {
  queue.length = 0;

  await interaction.deferReply(); // <- Diz ao Discord que vamos responder em breve

  await interaction.editReply({   // <- Aqui vai a resposta real
    embeds: [
      new EmbedBuilder()
        .setTitle("🧑‍🤝‍🧑 Practice Queue")
        .setDescription("No one is in the queue yet. Click below to join!")
        .setColor("Blue")
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("join").setLabel("Join").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("leave").setLabel("Leave").setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId("instructions").setLabel("Instructions").setStyle(ButtonStyle.Primary)
      )
    ]
  });
},

handleButtons: async (interaction) => {
const userId = interaction.user.id;
if (interaction.customId === "join") {
if (!queue.includes(userId)) queue.push(userId);
await interaction.channel.send({
content: `✅ <@${userId}> joined the queue! Choose your language or submit your own text.`
});
await interaction.deferUpdate();
}

if (interaction.customId === "leave") {
  const index = queue.indexOf(userId);
  if (index !== -1) queue.splice(index, 1);
  await interaction.reply({ content: `❌ <@${userId}> left the queue.`, ephemeral: false });
}

if (interaction.customId === "instructions") {
  await interaction.reply({
    content: "📘 **Instructions:**\n1. Join the queue.\n2. Choose a language or submit text.\n3. Submit corrections.\n4. Pass your turn.",
    ephemeral: false
  });
}

if (interaction.customId === "pass_turn") {
  const index = queue.indexOf(userId);
  if (index !== -1) {
    queue.splice(index, 1);
    queue.push(userId);
    await interaction.channel.send(`🔁 <@${userId}> passed the turn.`);
    await interaction.deferUpdate();
  }
}

}
};
