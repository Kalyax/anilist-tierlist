<template>
    <form class="text-center py-5">
        <input v-model="model" type="text" class="bg-zinc-800 px-4 py-2 rounded-xl w-1/2 outline-none" placeholder="Type an username...">
        <button @click="searchUser()" class="bg-blue-500 rounded-xl ml-3 px-3 py-2">Search</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const model = ref()

function replaceId(id: any){
    /*const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('id', id);
    console.log(searchParams.toString());
    window.location.search = ""
    history.pushState()
    window.location.search = searchParams.toString()*/

    const url = new URL(window.location as unknown as string);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);

}

async function searchUser(){
    const query = `#graphql
    query ($name: String){
    	User(name: $name){
            id
        }
    }`

    const variables = {
        name: model.value
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
        replaceId(json.data.User.id)
    } catch (err) {
        //TODO: POPUP ERROR
    }
}
</script>