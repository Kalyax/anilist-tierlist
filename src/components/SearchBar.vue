<template>
    <div class="py-5 px-6 block text-center md:flex md:justify-between md:items-center">
        <div class="flex items-center space-x-3">
            <img :src="props.user?.avatar.medium" alt="Logo" width="64" height="64" class="rounded-full">
            <p class="text-xl font-bold mb-2 md:mb-0">{{ props.user?.name }}</p>
        </div>
        <div class="w-full text-center mb-2 md:mb-0">
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
        <!--<a target="_blank" class="hover:animate-pulse md:hover:bg-zinc-800 rounded-full p-2 transition-all w-14" href="https://github.com/Kalyax/anilist-tierlist">
            <img class="mx-auto md:mx-0" src="/img/github-mark-white.svg" alt="Github" width="32">
        </a>-->
        <div class="group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto md:mx-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <div class="group-hover:block hidden absolute bg-zinc-800 shadow-xl px-3 py-3 rounded-xl w-80 left-auto right-5">
                <div class="mb-3">
                    <p class="text-xl font-bold text-zinc-300">Not yet implemented features</p>
                    <ul class="text-zinc-200">
                        <li>Self tier configuration</li>
                        <li>Show only anime based on some criterias</li>
                        <li>Error pop-ups</li>
                    </ul>
                </div>
                <div class="box-border flex space-x-2 justify-center">
                    <a href="https://github.com/Kalyax/anilist-tierlist" class="block bg-zinc-200 hover:bg-zinc-400 transition-all px-3 py-1 rounded-xl text-zinc-900 font-bold">GitHub</a>
                    <a href="https://github.com/Kalyax/anilist-tierlist/issues/new" class="block bg-zinc-200 hover:bg-zinc-400 transition-all px-3 py-1 rounded-xl text-zinc-900 font-bold">Report an issue</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue'

const emit = defineEmits(["fetchUser"])
const username = ref()

const props = defineProps({
    id: Number,
    user: Object
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