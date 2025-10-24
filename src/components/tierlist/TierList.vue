<template>
    <section v-if="stateStore.viewFetchState == 0">
        <p class="text-zinc-700 text-2xl text-center mt-10">Search a user to show a tierlist</p>
    </section>
    <section v-else>
        <div v-if="stateStore.viewFetchState == 1" class="absolute right-1/2 bottom-1/2 translate-x-1/2">
            <div class="border-t-transparent border-solid animate-spin rounded-full border-zinc-700 border-4 h-32 w-32"></div>
        </div>

        <SingleTier v-else v-for="(tier, index) in userStore.structuredEntries" :tier="tier" :index="index" 
                @updateView="(id: number, score: number) => {updateView(stateStore.mediaTypeState); updateAnilistScores(id, score)}" 
        />
    </section>
</template>

<script setup lang="ts">
import { watch }         from 'vue';
import { useUserStore }  from '@/stores/userStore';
import { MediaType }     from '@/types';
import SingleTier        from './../tierlist/SingleTier.vue';
import { useStateStore } from '@/stores/stateStore';
import { anilistAuth } from '@/graphql/anilist';
import { changeScoreQuery } from '@/graphql/queries';
import { useViewerStore } from '@/stores/viewerStore';

const userStore  = useUserStore()
const stateStore = useStateStore();
const viewerStore = useViewerStore();

//detects when the state mediaTypeState changes to update view
watch(() => stateStore.mediaTypeState, (newVal, _) => { updateView(newVal) })

//updating the content of the tierlist
function updateView(mediaType: MediaType){
    const entryList = mediaType == MediaType.ANIME ? userStore.animeList : userStore.mangaList
    userStore.structuredEntries = userStore.structureEntries(entryList, userStore.tiersStructure, userStore.hiddenFormats)
    stateStore.viewFetchState = 2
}

function updateAnilistScores(id: number, score: number){
    console.log(id)
    if(viewerStore.token === '' || viewerStore.viewer == undefined){}
    else if(viewerStore.viewer != undefined && viewerStore.viewer.id !== userStore.anilistUser.id){}
    else{
        anilistAuth(changeScoreQuery, viewerStore.token, {
            id: id,
            score: score
        }).then((response) => {
        }).catch((error) => {
            console.error("Error updating score for id ", id, ": ", error)
        })
    }
}

//Watches for id update
watch(() => userStore.anilistUser.id, (newVal) => {
    if(newVal) updateView(stateStore.mediaTypeState)
})

watch(() => stateStore.settingsState, (newVal) => {
    if(newVal) updateView(stateStore.mediaTypeState)
})
</script>