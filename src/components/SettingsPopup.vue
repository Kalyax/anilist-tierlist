<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50">
        <div class="bg-slate-800 min-w-fit min-h-0 w-fit max-h-screen rounded-xl px-10 py-8">
            <div class="flex justify-between  mb-2">
                <h1 class="font-bold text-2xl">Settings</h1>
                <button @click="emit('closeSettings')" class="hover:bg-slate-700 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-col xl:flex-row gap-x-8 justify-center mx-8 mt-5">
                <div>
                    <h2 class="text-xl mb-2 text-center font-semibold">Tiers <span class="font-light italic text-sm">From excluded, To included</span></h2>
                    <div class="space-y-2">
                        <div v-for="tier, i in userStore.tiers" class="flex items-center space-x-2">
                            <p :class="tier.color" class="text-slate-900 font-bold text-xl w-10 text-center py-2 rounded-xl group">
                                {{ tier.name }}
                                <div class="text-base hidden text-slate-200 bg-slate-900 group-hover:block absolute px-3 py-3 rounded-xl shadow-xl">
                                    <input type="text" v-model="userStore.tiers[i].name" class="mb-3 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-1.5 rounded-xl outline-none">
                                    <div class="grid grid-cols-7 gap-3">
                                        <button v-for="color in colors" @click="userStore.tiers[i].color = color">
                                            <div class="h-6 w-6 rounded-full" :class="color"></div>
                                        </button>
                                    </div>
                                </div>
                            </p>
                            <input type="text" v-model="userStore.tiers[i].from" placeholder="From" class="w-20 bg-slate-700 hover:bg-slate-700/80 focus:bg-slate-700/50 transition-colors px-3 py-1.5 rounded-xl outline-none">
                            <input type="text" v-model="userStore.tiers[i].to" placeholder="To" class="w-20 bg-slate-700 hover:bg-slate-700/80 focus:bg-slate-700/50 transition-colors px-3 py-1.5 rounded-xl outline-none">
                            <button class="px-1 py-1.5 hover:bg-slate-600 transition-colors rounded-xl font-bold" @click="removeTier(i)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        <button class="py-1 w-full hover:bg-slate-700 transition-colors rounded-xl font-bold" @click="addTier()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <h2 class="text-xl mb-2 text-center font-semibold">Hidden Formats</h2>
                    <div class="grid grid-cols-2 gap-x-2 gap-y-1.5">
                        <button 
                            v-for="mediaFormat in MediaFormat" 
                            :class="{ 'bg-slate-700 text-slate-300': userStore.settings.hiddenFormats.includes(mediaFormat), 
                                      'bg-slate-800': !userStore.settings.hiddenFormats.includes(mediaFormat)}" 
                            class="rounded-lg text-slate-400 px-2 py-1 font-semibold transition-colors" 
                            @click="editHiddenFormat(mediaFormat)">
                                {{ mediaFormat }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from './../stores/userStore';
import { MediaFormat, type Tier } from './../misc/types';

const userStore = useUserStore();

const editHiddenFormat = (format: MediaFormat) => {
    let hiddenFormats = userStore.settings.hiddenFormats
    if(hiddenFormats.includes(format))
        userStore.settings.hiddenFormats = hiddenFormats.filter((val) => val != format)
    else hiddenFormats.push(format)
}

const emit = defineEmits(["closeSettings"])

const colors = [
    "bg-red-400", 
    "bg-orange-400", 
    "bg-amber-400", 
    "bg-yellow-300", 
    "bg-lime-400", 
    "bg-green-400", 
    "bg-emerald-400",
    "bg-cyan-400", 
    "bg-sky-400", 
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-rose-400"
]

function addTier(){
    userStore.settings.sortedTiers.push([])
    userStore.tiers.push({
        name: "X",
        color: "bg-slate-200",
        from: null,
        to: null
    } as Tier)
}

function removeTier(i: number){
    userStore.tiers.splice(i, 1);
}
</script>