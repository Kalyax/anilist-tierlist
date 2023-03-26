import { defineStore } from 'pinia'

import type { User, Settings, Tiers } from './../misc/types';
import { tenScoreFormat } from './../misc/defaultTiers';

export const useUserStore = defineStore("user", () => {
    const info: User = {}
    const media: any = {}
    const settings: Settings = {
        tiers: tenScoreFormat as Tiers[]
    }

    return { info, media, settings }
})