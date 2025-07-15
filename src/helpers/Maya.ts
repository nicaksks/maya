import { REWARDS, SERVER_LIST } from "../constants";
import type { Server } from "./types/Servers";

export class Maya {

    private static MESSAGES: Record<string, string> = {
        "Invalid character": "Esse personagem não existe.",
        "Not enought free slots in gremory case.": "O grimório da sua conta está lotado! Use os itens e depois execute o comando novamente."
    }

    public static async getRewards(server: Server): Promise<string> {

        if (!SERVER_LIST[server.name]) {
            throw new Error('Servidor invalido.')
        }

        const response = await fetch(`${SERVER_LIST[server.name].reward}/${server.rewardId}`, {
            method: 'POST',
            body: this.payload(server.nickname)
        })

        if (!response.ok) {
            console.debug('[helpers/Maya.ts] -> %s', response.text())
            throw new Error('Não foi possível resgatar essa recompensa.')
        }

        const data = await response.json() as { error?: string };

        if ('error' in data) {
            throw new Error(this.MESSAGES[data.error!] || 'Você já resgatou essa recompensa nesse personagem.')
        }

        return REWARDS[server.name][server.rewardId]!.join('\n');
    }

    private static payload(nickname: string): FormData {
        const data = new FormData()
        data.append('claim', '1')                     // Level | ML | Reset
        data.append('character', Buffer.from(`${nickname}|2000|2000|2000`).toBase64())
        return data
    }
}