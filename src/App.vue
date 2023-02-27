<template>
    <SearchBar :id="user?.id" @fetchUser="saveUser"/>
    <TierList class="mx-10" :id="user?.id" :user="user"/>
</template>

<script setup lang="ts">
import TierList from './components/TierList.vue';
import SearchBar from './components/SearchBar.vue';
import { userQuery } from './misc/queries';

import { ref } from 'vue';

interface User {
    id: number,
    mediaListOptions: {
        scoreFormat: string
    }
}

const urlParams = new URLSearchParams(window.location.search);
const user = ref(<User>{
    id: Number(urlParams.get("id"))
})

async function saveUser(username: string): Promise<void>{
    user.value = <User> await fetchUser(username);
}

async function fetchUser(username: string): Promise<User | null>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: userQuery,
            variables: {
                name: username
            }
        })
    };

    try {
        const res = await fetch('https://graphql.anilist.co', options);
        const json = await res.json()
        if(json.data.User === null) throw Error()
        return <User> json.data.User
    } catch (err) {
        //TODO: POPUP ERROR
        console.log("ERROR: NOT FOUND USER")
    }
    return null;
}
</script>