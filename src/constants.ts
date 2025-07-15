import type { Details, Rewards, SERVERLIST } from "./helpers/types/Servers";

export const SERVER_LIST: Record<SERVERLIST, Details> = {
    'sky': {
        name: 'SkyMu',
        url: 'https://skymu.net',
        reward: 'https://skymu.net/level-rewards/dash-claim/'
    }
}

export const REWARDS: Record<SERVERLIST, Rewards> = {
    sky: {
        "0": [
            "Lucky Set",
            "[Bound] Weapon"
        ],
        "1": [
            "Lucky Set",
            "[Bound] Weapon"
        ],
        "2": [
            "Demon [7D]",
            "[Bound] BOL Greater x10"
        ],
        "3": [
            "[Bound] BOL Greater x10"
        ],
        "4": [
            "Blood Castle Ticket x10",
            "Devil Square Ticket x10"
        ],
        "5": [
            "Wings of Angel and Devils [7D]"
        ],
        "6": [
            "Pet Panda [7D]",
            "Panda Ring[7D]",
            "[Bound] BOL Greater x15"
        ],
        "7": [
            "Fenrir Blue [7D]"
        ],
        "8": [
            "[Bound] BOL Greater x15"
        ],
        "9": [
            "[Bound] BOL Greater x15",
            "Talisman of Ascension III [7D]",
            "Wings of Power [14D]",
            "Holy Angel Set and Weapons [7D]"
        ],
        "10": [
            "Worn Horseshoe [14D]",
            "Blood Castle Ticket x10",
            "Devil Square Ticket x10"
        ],
        "11": [
            "Chicken [14D]",
            "Tibetton [14D]",
            "[Bound] BOL Greater x20"
        ],
        "12": [
            "Fenrir Black [14D]",
            "Wizard's Ring [14D]",
            "Demon [14D]",
            "[Bound] BOL Greater x20"
        ],
        "13": [
            "4th Wing Voucher [30D]",
            "[Bound] BOL Greater x25",
            "Manticore Set and Weapons [14D]",
            "[Bound] x500 Ability Crystal"
        ],
        "14": [
            "Worn Horseshoe [14D]",
            "Seal of Divinity [14D]",
            "Master Seal of Wealth [14D]",
            "[Bound] BOL Greater x25"
        ],
        "15": [
            "Hawk Statue [14D]",
            "[Bound] BOL Greater x100"
        ],
        "16": [
            "Pack Warrior [30D]",
            "Demon [30D]",
            "Spirit of Guardian [30D]",
            "Wizard's Ring [30D]",
            "Lightning Set and Weapons [30D]"
        ],
        "17": ["Scroll Master of Defense", "Scroll Master of Wizardry", "Scroll Master of Health", "Scroll Master of Mana", "Scroll Master of Wrath", "Scroll of Swiftness Master"],
        "18": [
            "Wing Core (Type 1) Pattern"
        ],
        "19": [
            "Jewel of Bless x100",
            "Jewel of Soul x100",
            "Jewel of Chaos x100",
            "Jewel of Creation x100",
            "Golden Crest x100",
            "Uriel's Feather x100"
        ]
    }
};