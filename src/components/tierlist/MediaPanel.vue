<template>
    <a :href="entry.media.siteUrl" class="m-1 group" target="_blank" >
        <img
            class="rounded-xl w-16 sm:w-20 md:w-24 h-full" 
            :src="entry.media.coverImage.medium" :alt="entry.media.title.english"
        />

        <div class="z-40 hidden absolute group-hover:flex items-center gap-2 max-w-xl text-center bg-slate-200 text-slate-900 rounded-xl font-bold text-sm px-5 py-5 mt-1 shadow-xl">
            <div class="bg-slate-300 px-3 py-1 rounded-xl">
                <p class="text-xl">{{ entry.score }}</p>
                <p>{{ entry.media.format }}</p>
            </div>
            <p class="text-lg">{{ entry.media.title.english }}</p>
        </div>
    </a>
    

</template>

<script setup lang="ts">
const props = defineProps(["entry"])
</script>