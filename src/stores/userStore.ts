import { defineStore } from 'pinia'

interface User {
    id?: number,
    name?: string,
    avatar?: {
        medium?: string
    },
    mediaListOptions?: {
        scoreFormat?: string
    }
}

export const useUserStore = defineStore("user", () => {
    const info: User = {}
    const media: any = {}
    const settings: Object = {

    }

    return { info, media, settings }
})