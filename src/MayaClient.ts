import { Client, Collection, type ClientOptions } from 'discord.js'

export type MayaOptions = ClientOptions;

export default class MayaClient extends Client {
    constructor(options: MayaOptions) {
        super(options)
        this.commands = new Collection()
    }
}