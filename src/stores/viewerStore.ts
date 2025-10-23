import { ViewerUser } from '@/types';
import { defineStore } from 'pinia'

import { ref } from 'vue';

export const useViewerStore = defineStore("state", () => {
    const token = ref('');
    const viewer = {} as ViewerUser;
    return { token, viewer };
})