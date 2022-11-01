// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection, ActivityType, VoiceConnectionStatus, entersState } = require('discord.js');
const {token, nodes} = require ('./config.json')
const fs = require('node:fs')
const path = require('node:path')
const { Player } = require("discord-player")
const { Manager } = require ('erela.js');

// Create a new client instance
const client = new Client({ 
	intents: [ //Essentially setting permissions on what information the bot can access
		GatewayIntentBits.Guilds, //Server access
		GatewayIntentBits.GuildMessages, //Server message access
		GatewayIntentBits.MessageContent, //Server message content access
		GatewayIntentBits.GuildVoiceStates, //Access to state of guild voice channels
		GatewayIntentBits.GuildMembers
	] 
});

//Music functionality, node connection
client.manager = new Manager({
	nodes: [
		{
		host: 'localhost',
		port: 2333,
		password: 'youshallnotpass'
		}
	],
	send(id, payload) {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
})
	.on('nodeConnect', (node) => 
		console.log(`Node ${node.options.identifier} connected`))

	.on(`nodeError`, (node, error) => 
		console.log(`Node ${node.options.identifier} failed to connect. Error: ${error.message}`))

	.on('trackStart', (player, track) => {
		client.channels.cache
			.get(player.textChannel)
			.send(`Now playing: ${track.title}`);
	})

	.on('queueEnd', (player) => {
		client.channels.cache.get(player.textChannel).send("No more tracks in queue.");
		player.destroy();
	})

	client.player = new Player(client, {
		ytdlOptions: {
			quality: "highestaudio",
			highWaterMark: 1 << 25
		}
	})

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands'); //Specifying directories storing command files
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts')); //Searching through specified directory to find ts command files

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction: { isChatInputCommand: () => any; client: { commands: { get: (arg0: any) => any } }; commandName: any; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
client.on('ready', () => {
	client.user.setPresence({ //Setting bot presence ('online', 'dnd', 'offline' etc)
		status: 'online',
		activities: [{name: 'How to Become Sentient.', type: ActivityType.Watching}], //Setting custom status and activity type
	})
	client.manager.init(client.user.id);
	console.log(`Hello Sir. ${client.user.tag} is online`)
});

client.on("raw", (d) => client.manager.updateVoiceState(d));
// Login to Discord with your client's token
client.login(token);