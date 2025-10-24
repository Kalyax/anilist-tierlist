import { defineStore } from 'pinia'

import type { Tier, Entry, MediaFormat, AnilistUser } from '../types';
import { structureEntries as fStructureEntries } from '@/tiers/entrySort';

export const useUserStore = defineStore("user", () => {
    const anilistUser = {} as AnilistUser;
    const animeList = new Array<Entry>;
    const mangaList = new Array<Entry>;

    const tiersStructure = new Array<Tier>;
    const structureEntries = fStructureEntries;
    const structuredEntries = new Array<Array<Entry>>;

    const hiddenFormats = new Array<MediaFormat>;

    return {anilistUser, animeList, mangaList, tiersStructure, structureEntries, hiddenFormats, structuredEntries}
})