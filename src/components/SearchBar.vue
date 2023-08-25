<template>
    <div class="py-5 px-6 block text-center md:flex md:justify-between md:items-center shadow-sm">
        <a :href="userLink" target="_blank" class="justify-center md:justify-start mb-3 md:mb-0 flex items-center space-x-3" :class="{invisible: userStore.anilistUser.avatar?.medium === undefined}">
            <img :src="userStore.anilistUser.avatar?.medium" width="48" height="48" class="rounded-full">
            <p class="text-xl font-bold mb-2 md:mb-0 hover:text-slate-300 transition-colors">{{ userStore.anilistUser.name }}</p>
        </a>


        <div class="w-full text-center mb-2 md:mb-0 flex items-center justify-center">
            <input v-model="searchBar" type="text" 
                class="w-2/5 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-2 rounded-xl outline-none" 
                placeholder="Type an username...">

            <button class="ml-3 px-3 py-2 rounded-l-xl transition-colors" @click="switchMediaType(MediaType.ANIME)"
                :class="{'activeMTSearchBar': stateStore.mediaTypeState === MediaType.ANIME, 'unactiveMTSearchBar': stateStore.mediaTypeState === MediaType.MANGA}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            </button>
            <button class="px-3 py-2 rounded-r-xl transition-colors" @click="switchMediaType(MediaType.MANGA)"
                :class="{'activeMTSearchBar': stateStore.mediaTypeState === MediaType.MANGA, 'unactiveMTSearchBar': stateStore.mediaTypeState === MediaType.ANIME}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </button>

            <button 
                class="hover:bg-slate-800 transition-colors duration-300 font-bold rounded-xl ml-3 px-3 py-2" 
                @click="stateStore.settingsState = false">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>


        <a target="_blank" class="group md:hover:bg-slate-800 rounded-full p-2 transition-all relative" href="https://github.com/Kalyax/anilist-tierlist">
            <img class="mx-auto md:mx-0 group-hover:animate-pulse" src="/img/github-mark-white.svg" alt="Github" width="32">
            <span class="opacity-0 group-hover:opacity-100 transition-all absolute right-14 top-2 bg-black/20 px-2 py-1 rounded-md animate-none whitespace-nowrap">
                Leave a star!
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useUserStore }         from '@/stores/userStore';
import { MediaType }            from '@/types';
import { useStateStore } from '@/stores/stateStore';

const userStore = useUserStore()
const stateStore = useStateStore();

const emit = defineEmits(["fetchUser"])

function switchMediaType(from: number){
    if((stateStore.mediaTypeState == MediaType.ANIME && from == MediaType.ANIME) || (stateStore.mediaTypeState == MediaType.MANGA && from == MediaType.MANGA)) 
        return;
    
    stateStore.mediaTypeState = from
}

/** Watches the search bar input and emits it to the App component */
const searchBar = ref()
watch(searchBar, (val) => {
    setTimeout(async () => {
        if(searchBar.value === val) {    
            emit("fetchUser", searchBar.value);
        }
    }, 500)
})

const userLink = computed(() => {
    return "https://anilist.co/user/" + userStore.anilistUser.name
})
</script>