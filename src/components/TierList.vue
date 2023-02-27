<template>
    <section>
        <div class="md:flex py-2 md:space-x-2" v-for="name of buildGroups(data)">
            <div :class="(groupsColors as any)[name]" 
                class="w-full mb-3 md:mb-0 md:w-32 font-bold flex items-center justify-center text-3xl rounded-xl text-zinc-900">
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
    id: Number,
    user: Object
});

watch(() => props.id, (newVal) => {
    if(newVal) fetchEntries(newVal)
})

onMounted(() => {
    if(props.id) fetchEntries(props.id)
})

function formatData(data: any){
    const scoreFormat = props.user?.mediaListOptions.scoreFormat
    //TODO: factorize code later
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
    A: "bg-orange-300",
    B: "bg-amber-400",
    C: "bg-yellow-300",
    D: "bg-green-400",
    E: "bg-green-400"
}

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
        data.value = formatData(json.data)
    } catch (err) {
        //TODO: Popup error
        console.log("ERROR: FETCH DATA ERROR")
    }
}



/*function formatData(data: any): Array<Array<Object>>{
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
}*/
</script>