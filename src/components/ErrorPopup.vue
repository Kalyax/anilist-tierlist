<template>
    <div class="fixed bottom-15 right-20
    bg-red-400/50 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 backdrop-contrast-100 gradientSettings
    py-3 px-7 rounded-2xl w-1/6
    border-solid border border-red-300/50 transition-all duration-150">
        {{ props.msg }}
    </div>    

</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['msg']);
</script>