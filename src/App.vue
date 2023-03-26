<template>
    <SearchBar @fetchUser="(username: string) => fetchUser(username)" @openSettings="settingsState = false"/>
    <TierList class="mx-10"/>
    <SettingsPopup :class="{'hidden': settingsState}" @closeSettings="settingsState = true"/>
</template>

<script setup lang="ts">
import TierList      from './components/TierList.vue';
import SearchBar     from './components/SearchBar.vue';
import SettingsPopup from './components/SettingsPopup.vue';

import { onMounted, ref } from 'vue';

import { useUserStore }   from './stores/userStore';

import { userQuery, userIdQuery } from './misc/queries';
import fetchData                  from './misc/fetchData';
import { ScoreFormat, type User } from './misc/types'
import { tenScoreFormat }         from './misc/defaultTiers';

const userStore = useUserStore()

const settingsState = ref(true)

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
            else {
                userStore.info = <User> res.data.User
                const scoreFormat: ScoreFormat = <ScoreFormat> userStore.info.mediaListOptions?.scoreFormat
                if(scoreFormat == ScoreFormat.POINT_10 || scoreFormat == ScoreFormat.POINT_100 || scoreFormat == ScoreFormat.POINT_10_DECIMAL){
                    userStore.settings.tiers = tenScoreFormat
                }
                //else
            }
        })
        .catch((err) => {
            throw err;
        })
}
</script>