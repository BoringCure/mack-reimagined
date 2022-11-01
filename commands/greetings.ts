import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Say Hello to Me.'),
	async execute(interaction) {
        const responses = ['Hello.', 'How are you today?', 'Greetings']
		await interaction.reply('Hello.');
	},
};