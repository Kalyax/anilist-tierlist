<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50">
        <div class="bg-slate-900 min-w-1/2 min-h-2/3 rounded-xl px-10 py-8 overflow-y-scroll">
            <div class="flex justify-between">
                <h1 class="font-bold text-2xl">Settings</h1>
                <button @click="emit('closeSettings')" class="hover:bg-slate-800 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="text-center">
                <h2 class="text-xl">Tiers</h2>
                <p class="font-light italic text-sm  mb-2">From excluded, To included</p>
                <div class="space-y-2">
                    <button class="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 transition-colors rounded-xl font-bold" @click="addTier()">Add tier</button>
                    <div v-for="tier, i in userStore.tiers" class="flex items-center space-x-2">
                        <p :class="tier.color" class="text-slate-900 font-bold text-xl w-10 text-center py-2 rounded-xl mr-1">{{ tier.name }}</p>
                        <input type="text" v-model="userStore.tiers[i].from" placeholder="From" class="w-20 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-2 rounded-xl outline-none">
                        <input type="text" v-model="userStore.tiers[i].to" placeholder="To" class="w-20 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-2 rounded-xl outline-none">
                        <button class="px-3 py-1.5 bg-red-600 hover:bg-red-700 transition-colors rounded-xl font-bold" @click="removeTier(i)">Remove tier</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from './../stores/userStore';
import type { Tier } from './../misc/types';

const userStore = useUserStore();

const emit = defineEmits(["closeSettings"])

function addTier(){
    userStore.sortedTiers.push([])
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