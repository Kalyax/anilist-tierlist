<script setup lang="ts">
import TierList from './components/TierList.vue';
import SearchBar from './components/SearchBar.vue';

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get("id"))
</script>

<template>
    <SearchBar/>
    <TierList class="mx-10" v-if="id" :id="id"/>
</template>