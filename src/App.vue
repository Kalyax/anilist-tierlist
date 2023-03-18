<template>
    <SearchBar @fetchUser="(username: string) => fetchUser(username)"/>
    <TierList class="mx-10"/>
</template>

<script setup lang="ts">
import TierList from './components/TierList.vue';
import SearchBar from './components/SearchBar.vue';
import { userQuery, userIdQuery } from './misc/queries';
import { onMounted } from 'vue';
import fetchData from './misc/fetchData';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore()

const urlParams = new URLSearchParams(window.location.search);
/** user has to be initialised with url params in case there's an id and fetch the user if there's an id */
userStore.info.id = Number(urlParams.get("id"))
/** if there is an id param, fetch the user when mounted */
onMounted(async () => {
    if(userStore.info.id && userStore.info.id != 0) fetchUser(userStore.info.id)
})

/**
 * Fetches user data based on a given username or id
 * @param userIdentifier 
 */
async function fetchUser(userIdentifier: string | number){
    const isName = typeof userIdentifier == "string"
    const variables = isName ? {name: userIdentifier} : {id: userIdentifier}
    const query = isName ? userQuery : userIdQuery
    fetchData(query, variables)
        .then((res) => {
            if(res.data.User === null) console.error("No user found with this name")
            else userStore.info = res.data.User
        })
        .catch((err) => {
            throw err;
        })
}
</script>