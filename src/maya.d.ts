import { Collection } from "discord.js";
import type { Command } from "../types/Command";
import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

interface Command {
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | Message<boolean>>;
    autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
}