import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bella')
		.setDescription('Reserved for something special.'),
	async execute(interaction) {
		await interaction.reply('Matty ur being mean :(');
	},
};