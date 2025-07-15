import { GatewayIntentBits } from 'discord.js';
import events from './events';
import MayaClient from './MayaClient';

const client = new MayaClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
	]
})

client.login(process.env.TOKEN)
	.then(() => events(client));