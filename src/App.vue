<template>
    <SearchBar 
        @fetchUser="(username: string) => fetchUser(username)" 
        @openSettings="settingsState = false" 
        @mediaTypeState="(mts: MediaType) => mediaTypeState = mts"
    />
    <TierList class="mx-10" :mediaTypeState="mediaTypeState" :settingsState="settingsState"/>
    <SettingsPopup :class="{'opacity-0 pointer-events-none': settingsState}" class="transition-all"
        @closeSettings="settingsState = true"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TierList      from './components/tierlist/TierList.vue';
import SearchBar     from './components/SearchBar.vue';
import SettingsPopup from './components/SettingsPopup.vue';

import { useUserStore }                      from './stores/userStore';
import { userQuery, userIdQuery }            from './graphql/queries';
import { anilist }                           from './graphql/anilist';
import { toEntryList, setupDefaultTiers }    from './tiers/entrySort';
import { stringToTiers }                 from './tiers/tiersString';
import { MediaType, type AnilistUser }       from './types'

const userStore = useUserStore();

const settingsState = ref(true);
const mediaTypeState = ref(MediaType.ANIME);

const urlParams = new URLSearchParams(window.location.search);

/**if there is an id param when mounted, fetch the user */
onMounted(async () => {
    const id = Number(urlParams.get("id"))
    const tiers = urlParams.get("tiers");
    if(id && id != 0) fetchUser(id);
    if(tiers) userStore.tiersStructure = stringToTiers(decodeURI(tiers))
})

/**
 * Fetches user data based on a given username or id
 * @param userIdentifier 
 */
async function fetchUser(userIdentifier: string | number) {
    const isName = typeof userIdentifier == "string";
    const variables = isName ? {name: userIdentifier} : {id: userIdentifier};
    const query = isName ? userQuery : userIdQuery;

    const response = await anilist(query, variables);
    if(response.data.User) {
        userStore.anilistUser = response.data.User as AnilistUser;
        userStore.animeList = toEntryList(response.data.animeList.lists);
        userStore.mangaList = toEntryList(response.data.mangaList.lists);
        if(!urlParams.get("tiers"))
            userStore.tiersStructure = setupDefaultTiers(userStore.anilistUser.mediaListOptions.scoreFormat);
    }
    else console.error("No user found with this name");
}
</script>