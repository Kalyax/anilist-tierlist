<template>
    <div class="text-center py-5">
        <input v-model="username" type="text" class="bg-zinc-800 px-4 py-2 rounded-xl w-1/2 outline-none" placeholder="Type an username...">
        <button class="bg-blue-500 rounded-xl ml-3 px-3 py-2" @click="copyLink">Copy link</button>
        <input type="text" :value="getLink" id="link" class="hidden">
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, computed, defineProps } from 'vue'

const emit = defineEmits(["userId"])
const props = defineProps(["id"])
const username = ref()
const id = ref(props.id)

const getLink = computed(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.set('id', id.value);
    url.search = searchParams.toString();
    return url.toString();
})

watch(username, (val) => {
    setTimeout(async () => {
        if(username.value === val) {    
            id.value = await searchUser(username.value)
            emit("userId", id.value)
        }
    }, 1000)
})

function copyLink() {
    const copyText = document.getElementById("link") as HTMLInputElement;

    if(copyText == null) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    return false;
} 

async function searchUser(localUsername: string): Promise<string | null>{
    const query = `#graphql
    query ($name: String){
    	User(name: $name){
            id
        }
    }`

    const variables = {
        name: localUsername
    };

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
    };

    try {
        const res = await fetch(url, options);
        const json = await res.json()
        return json.data.User.id
    } catch (err) {
        //TODO: POPUP ERROR
    }
    return null
}
</script>