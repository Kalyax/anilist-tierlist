<template>
    <div class="relative rounded-2xl m-1" draggable="true">
        <div class="rounded-md absolute inset-0 z-10
          bg-slate-700/20 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 
            backdrop-contrast-100 gradientSettings
            text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 duration-300">

            <div class="absolute top-1 left-1 w-11/12 flex items-center justify-between">
                <div class="bg-slate-800/20 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 
                backdrop-contrast-100 gradientSettings px-2 py-1 flex items-center rounded-2xl">
                    <svg class="align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <p class="ml-1 text-xs">{{ entry.score }}</p>
                </div>

                <a :href="entry.media.siteUrl" target="_blank"
                class="bg-slate-800/20 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 
                backdrop-contrast-100 gradientSettings rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg>
                </a>
            </div>

            <h1 class="text-xs mx-1 font-bold">{{ getMediaName(entry) }}</h1>
            <p class="mx-1">{{ mediaFormatString(entry.media.format) }}</p>
        </div>
        <img :src="entry.media.coverImage.medium" :alt="getMediaName(entry)" class="rounded-md w-16 sm:w-20 md:w-28 h-full">
    </div>
    

</template>

<script setup lang="ts">
import { mediaFormatString } from './../../util';

const props = defineProps(["entry"])
const getMediaName = (entry) => {
    if(entry.media.title.english) return entry.media.title.english
    else if(entry.media.title.romaji) return entry.media.title.romaji
    else return entry.media.title.native
}
</script>