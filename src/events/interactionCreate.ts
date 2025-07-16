import { Events, MessageFlags, type Interaction } from "discord.js";
import MayaError from "../errors/MayaError";

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {

        if (interaction.user.bot) return;
        if (!interaction.isCommand() && !interaction.isAutocomplete()) return;

        const command = interaction.client.commands.get(interaction.commandName)

        if (interaction.isAutocomplete()) {
            await command.autocomplete(interaction);
            return
        }

        if (!command) {
            console.debug('[events/interactionCreate.ts] -> Command name %s not found.', interaction.commandName)
            interaction.reply({ content: 'Esse comando não existe.', flags: MessageFlags.Ephemeral })
            return
        }

        if (interaction.isChatInputCommand()) {

            const nickname = interaction.options.getString('nickname') || '';

            if (nickname.length < 3 || nickname.length > 32) {
                interaction.reply({ content: 'O nome desse personagem não é permitido.', flags: MessageFlags.Ephemeral })
                return
            }

            try {
                await command.execute(interaction, nickname);
            } catch (e: any) {

                if (interaction.replied || interaction.deferred) {
                    interaction.followUp({ content: e?.message ?? e, flags: MessageFlags.Ephemeral });
                    return
                }

                console.debug('[events/interactionCreate.ts] -> %s', e?.message ?? e)

                if (e instanceof MayaError) {
                    interaction.reply({ content: e.message, flags: MessageFlags.Ephemeral })
                    return
                }

                interaction.reply({ content: 'Ocorreu um erro ao executar esse comando.', flags: MessageFlags.Ephemeral })
            }

            return
        }
    }
};