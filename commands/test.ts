
import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('See if you are in a vc'),

	async execute(interaction) {
        if (interaction.member.voice.channel) {
            console.log('You are in a voice channel')
            await interaction.reply(`${interaction.user.tag} is in a voice channel`)
        }
        else {
            console.log('You are not in a vc')
        }

	},
}; 