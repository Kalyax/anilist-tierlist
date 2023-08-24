<template>
    <section v-if="fetchState == 0">
        <p class="text-slate-700 text-2xl text-center mt-10">Type an username to show a tierlist</p>
    </section>
    <section v-else>
        <div v-if="fetchState == 1" class="absolute right-1/2 bottom-1/2 translate-x-1/2">
            <div class="border-t-transparent border-solid animate-spin rounded-full border-slate-700 border-4 h-32 w-32"></div>
        </div>

        <SingleTier v-else v-for="(tier, index) in structuredEntries" :tier="tier" :index="index"/>
    </section>
</template>

<script setup lang="ts">
import { ref, watch }    from 'vue';
import { useUserStore }  from '@/stores/userStore';
import { MediaType }     from '@/types';
import SingleTier        from './../tierlist/SingleTier.vue';

const userStore  = useUserStore()

const fetchState = ref(0)

//detects when the props mediaTypeState changes to update view
const props          = defineProps(["mediaTypeState", "settingsState"]);
const mediaTypeState = ref(props.mediaTypeState);
watch(() => props.mediaTypeState, () => { switchMediaType(props.mediaTypeState) })

/**
 * Switch from anime panel to manga panel
 * @param from 
 */
function switchMediaType(from: number){
    if((mediaTypeState.value == MediaType.ANIME && from == MediaType.ANIME) || (mediaTypeState.value == MediaType.MANGA && from == MediaType.MANGA)) 
        return;
    
    mediaTypeState.value = from
    updateView(mediaTypeState.value)
}

//updating the content of the tierlist
const structuredEntries = ref()
function updateView(mediaType: MediaType){
    const entryList = mediaType == MediaType.ANIME ? userStore.animeList : userStore.mangaList
    fetchState.value = 1
    structuredEntries.value = userStore.structureEntries(entryList, userStore.tiersStructure, userStore.hiddenFormats)
    fetchState.value = 2
}

//Watches for id update
watch(() => userStore.anilistUser.id, (newVal) => {
    if(newVal) updateView(mediaTypeState.value) //fetchMedia(newVal)
})

watch(() => props.settingsState, (newVal) => {
    if(newVal) updateView(mediaTypeState.value)
})
</script>