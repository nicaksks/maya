import { InteractionResponse, MessageFlags, type ChatInputCommandInteraction } from "discord.js";
import type { SERVERLIST } from "../../helpers/types/Servers";
import { Maya } from "../../helpers/Maya";

export default async (interaction: ChatInputCommandInteraction, nickname: string): Promise<InteractionResponse<boolean>> => {

    const rewardId = interaction.options.getString('reward') || '';
    const server = interaction.options.getString('server');

    if (isNaN(Number(rewardId))) {
        return interaction.reply({ content: 'Recompensa invalida.', flags: MessageFlags.Ephemeral })
    }

    const rewards = await Maya.getRewards({ name: server as SERVERLIST, nickname, rewardId })

    return interaction.reply({ content: `Recompensa resgatada(s) com sucesso! \nRecompensa(s): \n\n${rewards}`, flags: MessageFlags.Ephemeral })
}