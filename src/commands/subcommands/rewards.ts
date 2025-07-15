import type { ChatInputCommandInteraction, Message } from "discord.js";
import type { SERVERLIST } from "../../helpers/types/Servers";
import { REWARDS } from "../../constants";
import { Maya } from "../../helpers/Maya";

export default async (interaction: ChatInputCommandInteraction, nickname: string): Promise<Message<boolean>> => {

    await interaction.deferReply({ flags: 'Ephemeral' })

    const server = interaction.options.getString('server');

    const rewards: string[] = []

    for (const itemId of Object.keys(REWARDS[server as SERVERLIST])) {
        try {
            const reward = await Maya.getRewards({ name: server as SERVERLIST, nickname, rewardId: itemId })
            rewards.push(reward);
        } catch (e: any) {
            if (e?.message.startsWith('O grimório')) {
                throw rewards.length > 0 ?
                    `${e.message} \nAs seguintes recompensas que foram resgatadas: \n\n${rewards.join(', ')}` :
                    e.message
            }
            continue
        }
    }

    return interaction.editReply({
        content:
            rewards.length == 0 ?
                'Você já resgatou todas as recompensas disponíveis.' :
                `Recompensa resgatada(s) com sucesso! \nRecompensa(s): \n${rewards.join(', ')}`
    })

}