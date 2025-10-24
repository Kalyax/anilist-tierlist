<template>
    <div class="flex justify-between items-center bg-zinc-900 py-5 px-6">
        <a :href="userLink" target="_blank" class="justify-center md:justify-start mb-3 md:mb-0 flex items-center space-x-3" :class="{invisible: userStore.anilistUser.avatar?.medium === undefined}">
            <img :src="userStore.anilistUser.avatar?.medium" width="48" height="48" class="rounded-full">
            <p class="text-xl font-bold mb-2 md:mb-0 hover:text-zinc-300 transition-colors">{{ userStore.anilistUser.name }}</p>
        </a>

        <div class="w-2/5 text-center mb-2 md:mb-0 flex items-center justify-center">
            <input v-model="searchBar" type="text" 
                class="w-full border-solid border-zinc-700 border bg-radial hover:from-zinc-800 to-zinc-900 focus:from-zinc-700 transition-colors px-4 py-2 rounded-2xl outline-none" 
                placeholder="Type a username...">

            <button class="cursor-pointer ml-3 mr-2 px-3 py-2 rounded-xl transition-colors border-solid border-zinc-700 border" @click="switchMediaType(MediaType.ANIME)"
                :class="{'activeMTSearchBar': stateStore.mediaTypeState === MediaType.ANIME, 'unactiveMTSearchBar': stateStore.mediaTypeState === MediaType.MANGA}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            </button>

            <button class="cursor-pointer px-3 py-2 rounded-xl transition-colors border-solid border-zinc-700 border" @click="switchMediaType(MediaType.MANGA)"
                :class="{'activeMTSearchBar': stateStore.mediaTypeState === MediaType.MANGA, 'unactiveMTSearchBar': stateStore.mediaTypeState === MediaType.ANIME}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </button>
        </div>

        

        <div class="flex items-center">  
            <button 
                class="cursor-pointer bg-radial from-zinc-800 hover:from-zinc-600 to-zinc-900 from-5% rounded-xl transition-colors border-solid border-zinc-700 border duration-300 font-bold mr-3 px-2 py-1" 
                @click="stateStore.infoState = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
            </button>
            <button 
                class="cursor-pointer bg-radial from-zinc-800 hover:from-zinc-600 to-zinc-900 from-5% rounded-xl transition-colors border-solid border-zinc-700 border duration-300 font-bold mr-3 px-2 py-1" 
                @click="stateStore.settingsState = false">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            <div v-if="viewerStore.token === '' || viewerStore.viewer == undefined">
                <a href="https://anilist.co/api/v2/oauth/authorize?client_id=5767&response_type=token" 
                class="border-solid border border-zinc-700 rounded-xl px-3 p-1.5 bg-radial from-zinc-800 hover:from-40% to-zinc-900 duration-100">
                    Log in
                </a>
            </div>
            <div v-else>
                <a class="cursor-pointer justify-center md:justify-start mb-3 md:mb-0 flex items-center space-x-3" 
                @click="searchBar = viewerStore.viewer.name">
                    <img :src="viewerStore.viewer.avatar?.medium" width="32" height="32" class="rounded-full">
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useUserStore }         from '@/stores/userStore';
import { MediaType }            from '@/types';
import { useStateStore }        from '@/stores/stateStore';
import { useViewerStore }       from '@/stores/viewerStore';

const userStore = useUserStore()
const stateStore = useStateStore();
const viewerStore = useViewerStore();

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