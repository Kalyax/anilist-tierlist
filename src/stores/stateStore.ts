import { MediaType } from '@/types';
import { defineStore } from 'pinia'

import { ref } from 'vue';

export const useStateStore = defineStore("state", () => {
    const settingsState = ref(true);
    const infoState = ref(true);
    const mediaTypeState = ref(MediaType.ANIME);
    const viewFetchState = ref(0);

    return { settingsState, mediaTypeState, viewFetchState, infoState }
})