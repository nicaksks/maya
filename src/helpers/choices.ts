import { REWARDS, SERVER_LIST } from "../constants"
import type { SERVERLIST } from "./types/Servers";

const textLength = (text: string): string => {
    return text.length > 100 ? text.substring(0, 97).concat('...') : text;
}

function servers(): { name: string, value: string }[] {
    const servers = Object.keys(SERVER_LIST) as Array<SERVERLIST>;
    return servers.map(server => ({ name: textLength(`${SERVER_LIST[server].name} | ${SERVER_LIST[server].url}`), value: server }))
}

function rewards(serverName: SERVERLIST): { name: string, value: string }[] {
    const server = REWARDS[serverName];
    const rewards = Object.keys(server)
    return rewards.map(i => ({ name: textLength(`[${i}] - ${server[i]?.join(', ')}`), value: i }))
}

export default { servers, rewards }