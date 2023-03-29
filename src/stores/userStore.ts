import { defineStore } from 'pinia'

import type { User, Tier, List, Settings } from './../misc/types';

export const useUserStore = defineStore("user", () => {
    const info: User = {} as User;
    const lists: Array<List> = [];
    const tiers : Array<Tier> = [];
    const settings: Settings = {
        sortedTiers: [],
        hiddenFormats: []
    }

    return { info, tiers, lists, settings }
})