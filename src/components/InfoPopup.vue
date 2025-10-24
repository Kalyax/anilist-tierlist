<template>
    <div @click="closeClickOutside($event)" id="bg-fade-info" class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50">
        <div class="min-w-fit min-h-0 w-fit max-h-screen rounded-2xl px-10 py-8 border-solid border-zinc-800 border 
        bg-zinc-700/20 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 
        backdrop-contrast-100 gradientSettings">
            <div class="flex justify-between mb-3">
                <h1 class="font-bold text-2xl mr-5">Informations</h1>
                <button @click="stateStore.infoState = true" class="hover:bg-zinc-700/50 rounded-xl transition-colors px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            Last updated: October 2025<br/><br/>

            <p class="text-xl">What's new?</p>
            <ul class="list-disc list-inside">
                <li>New style!</li>
                <li>You can now close pop-ups by clicking outside of them</li>
                <li>You can now drag entries from one tier to another (changes its score to the <br/>lower bound of the tier)</li>
                <li>You can now log in with your Anilist account and scores are automatically <br/>updated when entries are moved on the tierlist</li>
            </ul>
            <br/>

            <p class="text-xl">Coming soon...</p>
            <ul class="list-disc list-inside">
                <li>Phone support</li>
                <li>A way to edit entries' score more precisely than dragging them from one <br/> tier to another</li>
                
            </ul>
            <br/>

            <p class="font-bold">Please report any bugs on GitHub or the forum thread!</p><br/>

            <div class="flex items-center mb-1">
                <img class="mr-2" src="/img/github-mark-white.svg" alt="Github" width="20"/>
                <a href="https://github.com/Kalyax/anilist-tierlist" class="hover:underline font-bold" target="_blank">Leave a star on the GitHub page</a>
            </div>

            <div class="flex items-center">
                <img class="mr-2" src="/img/favicon-32x32.png" alt="Anilist" width="20"/>
                <a href="https://anilist.co/forum/thread/63809" class="hover:underline font-bold" target="_blank">Visit the Anilist forum thread</a>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/stateStore';

const stateStore = useStateStore();

function closeClickOutside(e: any){
    if(e.target == document.getElementById('bg-fade-info')){
        stateStore.infoState = true
    }
}
</script>