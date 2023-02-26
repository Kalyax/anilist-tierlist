<template>
    <section>
        <div class="flex p-2 space-x-2" v-for="group of groups">
            <div :class="group.color" class="w-32 font-bold flex items-center justify-center text-3xl rounded-xl text-zinc-900">{{ group.name }}</div>
            <div class="bg-zinc-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
                <a class="m-1" :href="entry.media.siteUrl" target="_blank" 
                    v-for="entry of data[group.name]"><img
                    class="rounded-xl w-auto h-full" 
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
    id: Number,
    user: Object
});

watch(() => props.id, (newVal) => {
    if(newVal) fetchEntries(newVal)
})

onMounted(() => {
    if(props.id) fetchEntries(props.id)
})

interface TierList{
    S: any[],
    A: any[],
    B: any[],
    C: any[],
    D: any[],
    E: any[]
}

function formatData2(data: any){
    const scoreFormat = props.user?.mediaListOptions.scoreFormat
    if(scoreFormat == "POINT_100" || scoreFormat == "POINT_10_DECIMAL" || scoreFormat == "POINT_10"){
        let entries: TierList = {
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

                if(scoreFormat == "POINT_100") score = Math.ceil(entry.score/10)
                else if(scoreFormat == "POINT_10_DECIMAL") score = Math.ceil(entry.score)
                else score = entry.score

                if(score != 0){
                    if(score == 10) entries.S.push(entry)
                    else if(score == 9) entries.A.push(entry)
                    else if(score == 8) entries.B.push(entry)
                    else if(score == 7) entries.C.push(entry)
                    else if(score == 6) entries.D.push(entry)
                    else entries.E.push(entry)
                }
            }
        }
        return entries
    }
}

const groups = [
    {
        name: "S",
        color : "bg-red-400"
    },
    {
        name: "A",
        color : "bg-orange-300"
    },
    {
        name: "B",
        color : "bg-amber-400"
    },
    {
        name: "C",
        color : "bg-yellow-300"
    },
    {
        name: "D",
        color : "bg-green-400"
    },
    {
        name: "E",
        color : "bg-green-400"
    }
]

const data: any = ref({});

async function fetchEntries(userId: number): Promise<void>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: animeCollectionsQuery,
            variables: {
                id: userId
            }
        })
    };

    try {
        const res = await fetch('https://graphql.anilist.co', options);
        const json = await res.json()
        data.value = formatData2(json.data)
    } catch (err) {
        //TODO: Popup error
    }
}



function formatData(data: any): Array<Array<Object>>{
    let entries: Array<Array<Object>> = [[], [], [], [], [], [], [], [], [], []]
    for(let list of data.MediaListCollection.lists){
        for(let entry of list.entries){
            if(entry.score != 0){
                let i = Math.ceil(entry.score)
                entries[i-1].push(entry)
            }
        }
    }
    return entries
}
</script>