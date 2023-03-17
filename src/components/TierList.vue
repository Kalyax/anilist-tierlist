<template>
    <section v-if="fetchState == 0">
        <p class="text-zinc-700 text-2xl text-center mt-10">Type an username to show a tierlist</p>
    </section>
    <section v-else-if="fetchState == 1">
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-zinc-700 border-4 h-32 w-32"></div>
        </div>
    </section>
    <section v-else>
        <div class="space-x-2 text-center mb-2">
            <button :class="{ buttonActive: panelState == PanelState.ANIME, buttonNotActive: panelState == PanelState.MANGA }" @click="switchPanel(PanelState.ANIME)" class="transition-all px-2 py-1 rounded-xl">Anime</button>
            <button :class="{ buttonActive: panelState == PanelState.MANGA, buttonNotActive: panelState == PanelState.ANIME }" @click="() => switchPanel(PanelState.MANGA)" class="transition-all px-2 py-1 rounded-xl">Manga</button>
        </div>
        <div class="md:flex py-2 md:space-x-2" v-for="name of buildGroups(data)">
            <div :class="(groupsColors as any)[name]" 
                class="w-full mb-3 md:mb-0 py-4 md:py-0 md:w-32 font-bold flex items-center justify-center text-3xl rounded-xl text-zinc-900">
                {{ name }}
            </div>
            <div class="bg-zinc-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
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

const props = defineProps({
    user: Object
});

const fetchState = ref(0)

enum PanelState{
    ANIME,
    MANGA
}

const panelState = ref(PanelState.ANIME);

function switchPanel(from: number){
    if(from != panelState.value && props.user?.id) fetchEntries(props.user?.id, panelState.value == PanelState.ANIME ? "MANGA" : "ANIME")
    if(from == PanelState.ANIME && panelState.value == PanelState.MANGA) panelState.value = PanelState.ANIME
    else panelState.value = PanelState.MANGA
}

//Watches for id update
watch(() => props.user?.id, (newVal) => {
    if(newVal) fetchEntries(newVal, panelState.value == PanelState.ANIME ? "ANIME" : "MANGA")
})

onMounted(() => {
    if(props.user?.id) fetchEntries(props.user?.id, panelState.value == PanelState.ANIME ? "ANIME" : "MANGA")
})

/** Sorts data retrived by the API call
 * @param data
 */
function formatData(data: any){
    //TODO: factorize code later
    const scoreFormat = props.user?.mediaListOptions.scoreFormat
    let entries;
    if(scoreFormat == "POINT_100" || scoreFormat == "POINT_10_DECIMAL" || scoreFormat == "POINT_10"){
        entries = <any>{
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            E: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number;

                if(scoreFormat == "POINT_100") score = Math.floor(entry.score/10)
                else if(scoreFormat == "POINT_10_DECIMAL") score = Math.floor(entry.score)
                else score = entry.score

                if(entry.score != 0){
                    if(score == 10) entries.S.push(entry)
                    else if(score == 9) entries.A.push(entry)
                    else if(score == 8) entries.B.push(entry)
                    else if(score == 7) entries.C.push(entry)
                    else if(score == 6) entries.D.push(entry)
                    else entries.E.push(entry)
                }
            }
        }
    }
    else if(scoreFormat == "POINT_5"){
        entries = <any>{
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            E: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number = entry.score

                if(score != 0){
                    if(score == 5) entries.S.push(entry)
                    else if(score == 4) entries.A.push(entry)
                    else if(score == 3) entries.B.push(entry)
                    else if(score == 2) entries.C.push(entry)
                    else entries.D.push(entry)
                }
            }
        }
    }
    else if(scoreFormat == "POINT_3"){
        entries = <any>{
            S: [],
            A: [],
            B: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number = entry.score

                if(score != 0){
                    if(score == 3) entries.S.push(entry)
                    else if(score == 2) entries.A.push(entry)
                    else entries.B.push(entry)
                }
            }
        }
    }
    return entries
}

/**
 * Returns all tiers where there's is at least one element
 * @param data
 */
function buildGroups(data: any){
    let groupList: string[] = []
    for(let key of Object.keys(data)){
        if (data[key].length > 0){
            groupList.push(key)
        }
    }
    return groupList
}

const groupsColors = {
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-amber-400",
    C: "bg-yellow-300",
    D: "bg-lime-400",
    E: "bg-green-400"
}

const data: any = ref({});

async function fetchEntries(userId: number, type: string): Promise<void>{
    fetchState.value = 1
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: animeCollectionsQuery,
            variables: {
                id: userId,
                type: type
            }
        })
    };

    try {
        const res = await fetch('https://graphql.anilist.co', options);
        const json = await res.json()
        data.value = formatData(json.data)
        fetchState.value = 2
    } catch (err) {
        //TODO: Popup error
        console.error("Error: Couldn't fetch user data")

    }
}
</script>