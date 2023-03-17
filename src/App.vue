<template>
    <SearchBar :user="user" @fetchUser="saveUser"/>
    <TierList class="mx-10" :user="user"/>
</template>

<script setup lang="ts">
import TierList from './components/TierList.vue';
import SearchBar from './components/SearchBar.vue';
import { userQuery, userIdQuery } from './misc/queries';
import { onMounted, ref } from 'vue';

/** User model returned by query */
interface User {
    id: number,
    name: string,
    avatar: {
        medium: string
    },
    mediaListOptions: {
        scoreFormat: string
    }
}

const urlParams = new URLSearchParams(window.location.search);
/** user has to be initialised with url params in case there's an id and fetch the user if there's an id */
const user = ref(<User>{
    id: Number(urlParams.get("id"))
})

onMounted(async () => {
    if(user.value.id != 0) user.value = <User> await fetchUser(user.value.id, userIdQuery);
})

async function saveUser(username: string): Promise<void>{
    user.value = <User> await fetchUser(username, userQuery);
}

async function fetchUser(userIdentifier: string | number, query: any): Promise<User | null>{
    const variables = typeof userIdentifier == "string" ? {name: userIdentifier} : {id: userIdentifier}

    const options = {
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
        const res = await fetch('https://graphql.anilist.co', options);
        const json = await res.json()
        if(json.data.User === null) throw Error()
        return <User> json.data.User
    } catch (err) {
        //TODO: POPUP ERROR
        console.error("Error: Couldn't find user")
    }
    return null;
}
</script>