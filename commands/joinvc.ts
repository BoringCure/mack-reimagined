import { ChannelType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnections, joinVoiceChannel } from '@discordjs/voice';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join voice channel'),//Specifying options to read in channel

    async execute(interaction){ //Slash commands are interactions, this is an event listener to respond to said interaction
        const vc = interaction.member.voice.channel;
        if (vc) {
            joinVoiceChannel({
                channelId: vc.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator})
        }
        else {
            await interaction.reply('You must be in a vc to use this command')
        }
        console.log(getVoiceConnections());
    }
}