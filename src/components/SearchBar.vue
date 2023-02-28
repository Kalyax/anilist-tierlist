<template>
    <div class="py-5 px-6 block text-center md:flex md:justify-between md:items-center">
        <p class="text-xl font-extrabold mb-2 md:mb-0">AniTierlist</p>
        <div class="w-full text-center">
            <input v-model="username" type="text" 
                class="w-2/5 bg-zinc-800 hover:bg-zinc-800/80 focus:bg-zinc-800/50 transition-colors px-4 py-2 rounded-xl outline-none" 
                placeholder="Type an username...">
            <button 
                class="bg-sky-500 hover:bg-sky-600 focus:bg-green-500 transition-colors duration-300 font-bold rounded-xl ml-3 px-3 py-2" 
                @click="copyLink">
                Copy link
            </button>
            <input type="text" :value="getLink" id="link" class="hidden">
        </div>
        <a target="_blank" class="hover:animate-pulse md:hover:bg-zinc-800 rounded-full p-2 transition-all w-14" href="https://github.com/Kalyax/anilist-tierlist">
            <img class="mx-auto md:mx-0" src="/img/github-mark-white.svg" alt="Github" width="32">
        </a>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue'

const emit = defineEmits(["fetchUser"])
const username = ref()

const props = defineProps({
    id: Number
})

/** Watches the username input */
watch(username, (val) => {
    setTimeout(async () => {
        if(username.value === val) {    
            emit("fetchUser", username.value);
        }
    }, 750)
})

/** Copy button functions */
const getLink = computed(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.set('id', <string><unknown>props.id);
    url.search = searchParams.toString();
    return url.toString();
})

function copyLink() {
    const copyText = document.getElementById("link") as HTMLInputElement;

    if(copyText == null) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    return false;
} 
</script>