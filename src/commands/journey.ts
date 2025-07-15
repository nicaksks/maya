import { AutocompleteInteraction, ChatInputCommandInteraction, InteractionResponse, Message, MessageFlags, SlashCommandBuilder } from "discord.js";
import choices from "../helpers/choices";
import reward from "./subcommands/reward";
import rewards from "./subcommands/rewards";
import type { SERVERLIST } from "../helpers/types/Servers";

export default {
    data: new SlashCommandBuilder()
        .setName('journey')
        .setDescription('Resgatar as recompensas do sistema de journey')
        .addSubcommand(reward =>
            reward
                .setName('reward')
                .setDescription('Resgate uma recompensa especifica.')
                .addStringOption(server =>
                    server.setName('server')
                        .setDescription('Escolha um servidor.')
                        .setRequired(true)
                        .addChoices(choices.servers())
                )
                .addStringOption(nickname =>
                    nickname
                        .setName('nickname')
                        .setDescription('Nome do seu personagem.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reward')
                        .setDescription('Escolha uma recompensa.')
                        .setRequired(true)
                        .setAutocomplete(true)
                ))
        .addSubcommand(rewards =>
            rewards
                .setName('rewards')
                .setDescription('Resgate todas as recompensas do sistema de Jornada.')
                .addStringOption(server =>
                    server.setName('server')
                        .setDescription('Escolha um servidor.')
                        .setRequired(true)
                        .addChoices(choices.servers())
                )
                .addStringOption(nickname =>
                    nickname
                        .setName('nickname')
                        .setDescription('Nome do seu personagem.')
                        .setRequired(true))),
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const serverName = interaction.options.getString('server');
        await interaction.respond(choices.rewards(serverName as SERVERLIST).splice(0, 25));
    },
    async execute(
        interaction: ChatInputCommandInteraction,
        nickname: string,
    ): Promise<InteractionResponse<boolean> | Message<boolean>> {
        switch (interaction.options.getSubcommand()) {
            case 'reward': return reward(interaction, nickname)
            case 'rewards': return rewards(interaction, nickname)
            default: return interaction.reply({ 'content': 'Sub comando não encontrado.', flags: MessageFlags.Ephemeral })
        }
    },
};