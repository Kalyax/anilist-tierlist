<template>
    <section>
        <div class="flex p-2 space-x-2" v-for="group of groups">
            <div :class="group.color" class="w-32 font-bold flex items-center justify-center text-3xl rounded-xl text-zinc-900">{{ group.name }}</div>
            <div class="bg-zinc-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
                <a class="m-1" :href="entry.media.siteUrl" target="_blank" 
                    v-for="entry of data[group.score-1]"><img
                    class="rounded-xl w-auto h-full" 
                    :src="entry.media.coverImage.medium" :alt="entry.media.title.english">
                </a>
                <a class="m-1" :href="entry.media.siteUrl" target="_blank" 
                    v-for="entry of data[group.score-2]" ><img 
                    class="rounded-xl w-auto h-full" 
                    :src="entry.media.coverImage.medium" :alt="entry.media.title.english">
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    id: Number
});

const groups = [
    {
        score: 10,
        name: "S",
        color : "bg-red-400"
    },
    {
        score: 8,
        name: "A",
        color : "bg-orange-300"
    },
    {
        score: 6,
        name: "B",
        color : "bg-amber-400"
    },
    {
        score: 4,
        name: "C",
        color : "bg-yellow-300"
    },
    {
        score: 2,
        name: "D",
        color : "bg-green-400"
    },
]

const query = `#graphql
query ($id: Int) {
  MediaListCollection(userId: $id, type: ANIME){
    lists {
      entries{
        score
        media{
          id
          siteUrl
          title{
            english
          }
          coverImage {
            medium
          }
        }
      }
    }
  }
}`

const variables = {
    id: props.id
};

const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
};

const data: any = ref({});

async function fetchEntries(){
    try {
        const res = await fetch(url, options);
        const json = await res.json()
        data.value = formatData(json.data)
    } catch (err) {
        if(err) throw err;
    }
}
function formatData(data: any){
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

fetchEntries()
</script>