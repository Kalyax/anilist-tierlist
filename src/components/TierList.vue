<template>
    <section v-if="fetchState == 0">
        <p class="text-slate-700 text-2xl text-center mt-10">Type an username to show a tierlist</p>
    </section>
    <section v-else>
        <div class="space-x-2 text-center mb-2">
            <button :class="{ buttonActive: panelState == MediaType.ANIME, buttonNotActive: panelState == MediaType.MANGA }" @click="switchPanel(MediaType.ANIME)" class="transition-all px-2 py-1 rounded-xl">Anime</button>
            <button :class="{ buttonActive: panelState == MediaType.MANGA, buttonNotActive: panelState == MediaType.ANIME }" @click="() => switchPanel(MediaType.MANGA)" class="transition-all px-2 py-1 rounded-xl">Manga</button>
        </div>
        
        <div v-if="fetchState == 1" class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-slate-700 border-4 h-32 w-32"></div>
        </div>

        <div v-else class="md:flex py-2 md:space-x-2" v-for="tier of computedTiers">
            <div :class="tier.color" 
                class="w-full mb-3 md:mb-0 py-4 md:py-0 md:w-32 font-bold flex items-center justify-center text-center text-2xl rounded-xl text-slate-900 break-all hyphens-auto">
                <p class="p-1">{{ tier.name }}</p>
            </div>
            <div class="bg-slate-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
                <a v-for="entry of tier.entries" :href="entry.media.siteUrl" class="m-1 group" target="_blank" >
                    <img
                        class="rounded-xl w-16 sm:w-20 md:w-24 h-full" 
                        :src="entry.media.coverImage.medium" :alt="entry.media.title.english">
                    <div class="z-40 hidden absolute group-hover:flex items-center gap-2 max-w-xl text-center bg-slate-200 text-slate-900 rounded-xl font-bold text-sm px-5 py-5 mt-1 shadow-xl">
                        <div class="bg-slate-300 px-3 py-1 rounded-xl">
                            <p class="text-xl">{{ entry.score }}</p>
                            <p>{{ entry.media.format }}</p>
                        </div>
                        <p class="text-lg">{{ entry.media.title.english }}</p>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';

import { useUserStore } from './../stores/userStore';

import { animeCollectionsQuery } from '../misc/queries/queries';
import fetchData from '../misc/queries/fetchData';
import { type List, MediaType, type Tier } from '@/misc/types';
import { sortMedia } from '@/misc/tiers/tierSorter';

const userStore = useUserStore()

const fetchState = ref(0)
const panelState = ref(MediaType.ANIME);

const computedTiers = computed(() => {
    const tiers = JSON.parse(JSON.stringify(userStore.tiers));
    return tiers
        .map((tier: Tier, index: number) => {
            tier.entries = userStore.settings.sortedTiers[index];
            return tier;
        })
        .filter((tier: Tier) => tier.entries?.length != 0)
    }
)

/**
 * Fetch media from userId profile
 * @param userId 
 * @param type Panel
 */
async function fetchMedia(userId: number){
    fetchState.value = 1

    const variables = {
        id: userId,
        type: MediaType[panelState.value]
    }
    fetchData(animeCollectionsQuery, variables)
        .then((res) => {
            if(userStore.info.mediaListOptions?.scoreFormat != undefined){
                userStore.lists = <Array<List>> res.data.MediaListCollection.lists
                sortMedia()
                fetchState.value = 2
            }
        })
        .catch(err => {throw err;})
}

/**
 * Switch from anime panel to manga panel
 * @param from 
 */
function switchPanel(from: number){
    if((panelState.value == MediaType.ANIME && from == MediaType.ANIME) || (panelState.value == MediaType.MANGA && from == MediaType.MANGA)) 
        return;
    
    panelState.value = from
    if(userStore.info.id != undefined)
        fetchMedia(userStore.info.id)
}

//Watches for id update
watch(() => userStore.info.id, (newVal) => {
    if(newVal) fetchMedia(newVal)
})

//when loaded with id param
onMounted(() => {
    if(userStore.info.id) fetchMedia(userStore.info.id)
})
</script>