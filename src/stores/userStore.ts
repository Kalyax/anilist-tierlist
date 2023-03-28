import { defineStore } from 'pinia'

import type { User, Tier, List, Entry } from './../misc/types';

export const useUserStore = defineStore("user", () => {
    const info: User = {} as User;
    //const media: any = {}
    const lists: Array<List> = [];

    const sortedTiers: Array<Array<Entry>> = [];
    const tiers : Tier[] = [];

    return { info, tiers, lists, sortedTiers }
})