import { REST, Collection, Routes } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';
import type MayaClient from './MayaClient';

function createRest(): REST {
    return new REST({ version: '10' })
        .setToken(process.env.TOKEN!);
}

function readCommandsFolder(client: MayaClient): any[] {

    const commands = []

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const { default: command } = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    return commands
};


export default async (client: MayaClient, mode: 'local' | 'global'): Promise<void> => {

    const rest = createRest();

    client.commands = new Collection();
    const commands = readCommandsFolder(client);

    if (mode === 'local') {
        rest.put(Routes.applicationGuildCommands(client.user!.id, process.env.GUILD!), { body: commands })
        return
    }

    rest.put(Routes.applicationCommands(client.user!.id), { body: commands })
};