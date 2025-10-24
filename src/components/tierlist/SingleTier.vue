<template>
    <div v-if="tier.length != 0" class="md:flex py-2"
                @dragover.prevent @drop="(e: any) => {
                  try {
                    const data = JSON.parse(e.dataTransfer?.getData('text/plain') || '{}')
                    userStore.structuredEntries[data.fromIndex][data.indexInTier].score = userStore.tiersStructure[index].from as number;
                    $emit('updateView');
                  } catch (err) { /* ignore invalid payload */ }
                }">

        <div :class="userStore.tiersStructure[index]?.color" 
            class="w-full mb-3 md:mb-0 py-4 md:py-0 md:w-32 font-bold flex items-center justify-center text-center 
            text-2xl rounded-l-2xl text-zinc-900 break-all hyphens-auto">
            <p class="p-1 text-2xl">{{ userStore.tiersStructure[index]?.name }}</p>
        </div>
        <div class="bg-zinc-800 rounded-r-2xl p-3 flex flex-row flex-wrap w-full h-full">
          <MediaPanel v-for="(entry, j) in tier" :key="entry.media.id" :entry="entry"
                draggable="true"
                @dragstart="(e: any) => {
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', JSON.stringify({ fromIndex: index, indexInTier: j }));
                }"
          />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import MediaPanel       from './MediaPanel.vue';

const userStore = useUserStore()
const props     = defineProps(["tier", "index"]);
</script>