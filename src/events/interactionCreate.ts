import { AutocompleteInteraction, Events, MessageFlags, type CacheType, type Interaction } from "discord.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
        const command = interaction.client.commands.get(interaction.commandName)
        await command.autocomplete(interaction);
    },

    async execute(interaction: Interaction) {

        if (interaction.user.bot) return;
        if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;

        const command = interaction.client.commands.get(interaction.commandName)

        if (interaction.isAutocomplete()) {
            await command.autocomplete(interaction)
            return 
        }

        if (!command) {
            console.debug('[events/interactionCreate.ts] -> Command name %s not found.', interaction.commandName)
            interaction.reply({ content: 'Esse comando não existe.', flags: MessageFlags.Ephemeral })
        }

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
            
            interaction.reply({ content: 'Ocorreu um erro ao executar esse comando.', flags: MessageFlags.Ephemeral })
        }
    },
};