<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50">
        <div class="bg-slate-900 w-1/2 h-1/2 rounded-xl px-10 py-8 overflow-y-scroll">
            <h1 class="font-bold text-2xl">Settings</h1>
            <button @click="$emit('closeSettings')">close</button>
            <div class="bg-slate-800 space-x-3 px-2 py-2 w-fit rounded-xl">
                <span disabled>10 Point Decimal</span>
                <span disabled>100 Point</span>
                <span disabled>10 Point</span>
                <span disabled>5 Star</span>
                <span disabled>3 Point Smiley</span>
            </div>
            <div>
                <h2 class="text-xl">Tiers <span class="font-light italic text-sm">From excluded, To included</span></h2>
                <div class="space-y-2">
                    <button class="bg-red-800" @click="addTier()">Add tier</button>
                    <div v-for="tier, i in userStore.settings.tiers" class="flex items-center space-x-2">
                        <p :class="tier.color" class="text-slate-900 font-bold text-xl w-10 text-center py-3 rounded-xl mr-1">{{ tier.name }}</p>
                        <input type="text" v-model="userStore.settings.tiers[i].from" placeholder="From" class="w-20 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-2 rounded-xl outline-none">
                        <input type="text" v-model="userStore.settings.tiers[i].to" placeholder="To" class="w-20 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-800/50 transition-colors px-4 py-2 rounded-xl outline-none">
                        <button class="bg-red-800" @click="removeTier(i)">Remove tier</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from './../stores/userStore';
import type { Tiers } from './../misc/types';

const userStore = useUserStore();

const emit = defineEmits(["closeSettings"])

function addTier(){
    userStore.settings.tiers.push({
        name: "X",
        color: "bg-slate-200",
        from: null,
        to: null
    } as Tiers)
}

function removeTier(i: number){
    userStore.settings.tiers.splice(i, 1);
}
</script>