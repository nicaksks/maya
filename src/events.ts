import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import type { Client } from 'discord.js';

export default (client: Client) => {
    const eventsPath = join(__dirname, 'events');
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const filePath = join(eventsPath, file);
        const { default: event }= require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            continue
        }

        client.on(event.name, (...args) => event.execute(...args));
    };
}