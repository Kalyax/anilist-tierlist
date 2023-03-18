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

        <div v-else class="md:flex py-2 md:space-x-2" v-for="name of buildGroups(data)">
            <div :class="(groupsColors as any)[name]" 
                class="w-full mb-3 md:mb-0 py-4 md:py-0 md:w-32 font-bold flex items-center justify-center text-3xl rounded-xl text-slate-900">
                {{ name }}
            </div>
            <div class="bg-slate-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
                <a class="m-1" :href="entry.media.siteUrl" target="_blank" 
                    v-for="entry of data[name]">
                    <img
                        class="rounded-xl w-16 sm:w-20 md:w-24 h-full" 
                        :src="entry.media.coverImage.medium" :alt="entry.media.title.english">
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { animeCollectionsQuery } from './../misc/queries';
import { buildGroups, formatMedia, groupsColors } from '@/misc/sortData';
import fetchData from './../misc/fetchData';

const props = defineProps({
    user: Object
});

enum MediaType{
    ANIME,
    MANGA
}

const data: any = ref({});
const fetchState = ref(0)
const panelState = ref(MediaType.ANIME);

/**
 * Switch from anime panel to manga panel
 * @param from 
 */
function switchPanel(from: number){
    const hasChanged = from != panelState.value;

    if(from == MediaType.ANIME && panelState.value == MediaType.MANGA) 
        panelState.value = MediaType.ANIME
    else 
        panelState.value = MediaType.MANGA

    //fetch new MediaType
    if(hasChanged && props.user?.id) 
        fetchEntries(props.user?.id, panelState.value)
}

//Watches for id update
watch(() => props.user?.id, (newVal) => {
    if(newVal) fetchEntries(newVal, panelState.value)
})

//when loaded with id param
onMounted(() => {
    if(props.user?.id) fetchEntries(props.user?.id, panelState.value)
})

/**
 * 
 * @param userId 
 * @param type Panel
 */
async function fetchEntries(userId: number, type: MediaType){
    fetchState.value = 1

    const variables = {
        id: userId,
        type: MediaType[type]
    }
    fetchData(animeCollectionsQuery, variables)
        .then((res) => {
            data.value = formatMedia(res.data, props.user?.mediaListOptions.scoreFormat)
            fetchState.value = 2
        })
        .catch(err => {throw err;})
}
</script>