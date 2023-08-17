<template>
    <section v-if="fetchState == 0">
        <p class="text-slate-700 text-2xl text-center mt-10">Type an username to show a tierlist</p>
    </section>
    <section v-else>
        <div class="space-x-2 text-center mb-2">
            <button :class="{ buttonActive: panelState == MediaType.ANIME, buttonNotActive: panelState == MediaType.MANGA }" @click="switchPanel(MediaType.ANIME)" class="transition-all px-2 py-1 rounded-xl">Anime</button>
            <button :class="{ buttonActive: panelState == MediaType.MANGA, buttonNotActive: panelState == MediaType.ANIME }" @click="() => switchPanel(MediaType.MANGA)" class="transition-all px-2 py-1 rounded-xl">Manga</button>
        </div>
        
        <div v-if="fetchState == 1" class="absolute right-1/2 bottom-1/2 translate-x-1/2">
            <div class="border-t-transparent border-solid animate-spin rounded-full border-slate-700 border-4 h-32 w-32"></div>
        </div>

        <SingleTier v-else v-for="tier of computedTiers" :tier="tier"/>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { useUserStore }                    from './../stores/userStore';

import { animeCollectionsQuery }           from '../misc/queries/queries';
import fetchData                           from '../misc/queries/fetchData';
import { type List, MediaType, type Tier } from '@/misc/types';
import { sortMedia }                       from '@/misc/tiers/tierSorter';

import SingleTier                          from './tierlist/SingleTier.vue';

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