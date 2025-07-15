import { Events } from 'discord.js';
import deploy from '../deploy';
import type MayaClient from '../MayaClient';

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client: MayaClient) {

        console.log(`everyday i imagine a future where i can be with you... 🌸`);

        try {
            await deploy(client, 'local')
        } catch (e: any) {
            console.debug('[events/ready.ts] -> %s', e.message)
        }
    },
};