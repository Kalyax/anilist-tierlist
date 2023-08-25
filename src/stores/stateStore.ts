import { MediaType } from '@/types';
import { defineStore } from 'pinia'

import { ref } from 'vue';

export const useStateStore = defineStore("state", () => {
    const settingsState = ref(true);
    const mediaTypeState = ref(MediaType.ANIME);

    return { settingsState, mediaTypeState }
})