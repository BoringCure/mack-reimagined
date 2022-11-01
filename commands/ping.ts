import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Hows our connection?'),
	async execute(interaction) {
		await interaction.reply(`Your ping is ${interaction.ws.ping}ms.`);
	},
};