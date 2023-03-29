import { defineStore } from 'pinia'

import { type User, type Tier, type List, type Settings, MediaFormat } from './../misc/types';

export const useUserStore = defineStore("user", () => {
    const info: User = {} as User;
    const lists: Array<List> = [];
    const tiers : Array<Tier> = [];
    const settings: Settings = {
        sortedTiers: [],
        hiddenFormats: [MediaFormat.MOVIE]
    }

    return { info, tiers, lists, settings }
})