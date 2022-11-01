import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Learn more about me.'),
	async execute(interaction) {
		await interaction.reply('After much coffee and research, I was programmed by Matthew Hirmiz. My creator and I share a birthday, as I was put into service effective May 24, 2021.');
	},
};