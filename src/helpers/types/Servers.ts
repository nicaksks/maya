export type SERVERLIST = 'sky';

export type Server = {
    readonly name: SERVERLIST;
    readonly nickname: string;
    readonly rewardId: string;
}

export type Details = {
    readonly name: string;
    readonly url: string;
    readonly reward: string
}

export type Rewards = {
    readonly [id: string]: readonly string[]
}