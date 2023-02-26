<script setup lang="ts">
import TierList from './components/TierList.vue';
import SearchBar from './components/SearchBar.vue';

import { ref } from 'vue';

const urlParams = new URLSearchParams(window.location.search);
const id = ref(Number(urlParams.get("id")))

function usernameUpdate(newId: string){
    id.value = Number(newId)
}
</script>

<template>
    <SearchBar @userId="usernameUpdate" :id="id"/>
    <TierList class="mx-10" :id="id"/>
</template>