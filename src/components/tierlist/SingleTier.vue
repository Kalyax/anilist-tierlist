<template>
    <div class="md:flex py-2 md:space-x-2">
        <div :class="tier.color" 
            class="w-full mb-3 md:mb-0 py-4 md:py-0 md:w-32 font-bold flex items-center justify-center text-center text-2xl rounded-xl text-slate-900 break-all hyphens-auto">
            <p class="p-1">{{ tier.name }}</p>
        </div>
        <div class="bg-slate-800 rounded-xl p-3 flex flex-row flex-wrap w-full h-full">
            <MediaPanel v-for="entry of tier.entries" :entry="entry"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import MediaPanel from './MediaPanel.vue';


const props = defineProps(["tier"]);
</script>