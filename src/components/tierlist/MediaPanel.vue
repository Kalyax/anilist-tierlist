<template>
    <a :href="entry.media.siteUrl" class="m-1 group" target="_blank" >
        <img
            class="rounded-xl w-16 sm:w-20 md:w-24 h-full" 
            :src="entry.media.coverImage.medium" :alt="getMediaName(entry)"
        />

        <div class="z-40 hidden absolute group-hover:flex items-center gap-2 max-w-xl text-center bg-slate-200 text-slate-900 rounded-xl font-bold text-sm px-5 py-5 mt-1 shadow-xl">
            <div class="bg-slate-300 px-3 py-1 rounded-xl">
                <p class="text-xl">{{ entry.score }}</p>
                <p>{{ entry.media.format }}</p>
            </div>
            <p class="text-lg">{{ getMediaName(entry) }}</p>
        </div>
    </a>
    

</template>

<script setup lang="ts">
const props = defineProps(["entry"])
const getMediaName = (entry) => {
    if(entry.media.title.english) return entry.media.title.english
    else if(entry.media.title.romaji) return entry.media.title.romaji
    else return entry.media.title.native
}
</script>