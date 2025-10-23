<template>
    <SearchBar @fetchUser="(username: string) => fetchUser(username)" />
    <TierList class="mx-10" />
    <SettingsPopup :class="{'opacity-0 pointer-events-none': stateStore.settingsState}" class="transition-all" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import TierList      from './components/tierlist/TierList.vue';
import SearchBar     from './components/SearchBar.vue';
import SettingsPopup from './components/SettingsPopup.vue';

import { useUserStore }                      from './stores/userStore';
import { useStateStore }                     from './stores/stateStore';
import { useViewerStore }                    from './stores/viewerStore';
import { userQuery, userIdQuery, viewerQuery }            from './graphql/queries';
import { anilist, anilistAuth }                           from './graphql/anilist';
import { toEntryList, setupDefaultTiers }    from './tiers/entrySort';
import { stringToTiers }                     from './tiers/tiersString';
import { type AnilistUser }                  from './types'

const userStore = useUserStore();
const stateStore = useStateStore();
const viewerStore = useViewerStore();

const urlParams = new URLSearchParams(window.location.search);

/**if there is an id param when mounted, fetch the user */
onMounted(async () => {
    const id = Number(urlParams.get("id"))
    const tiers = urlParams.get("tiers");
    const access_token = document.URL.split("#");
    if(tiers) userStore.tiersStructure = stringToTiers(decodeURI(tiers))
    if(id && id != 0) {
        stateStore.viewFetchState = 1
        fetchUser(id);
    }
    if(access_token.length > 1){
        viewerStore.token = access_token[1].split("&")[0].split("=")[1];
        const response = await anilistAuth(viewerQuery, viewerStore.token, {})
        viewerStore.viewer = response.data.Viewer;
    }
})

/**
 * Fetches user data based on a given username or id
 * @param userIdentifier 
 */
async function fetchUser(userIdentifier: string | number) {
    stateStore.viewFetchState = 1

    const isName = typeof userIdentifier == "string";
    const variables = isName ? {name: userIdentifier} : {id: userIdentifier};
    const query = isName ? userQuery : userIdQuery;

    const response = await anilist(query, variables);
    if(response.data.User) {
        userStore.anilistUser = response.data.User as AnilistUser;
        userStore.animeList = toEntryList(response.data.animeList.lists);
        userStore.mangaList = toEntryList(response.data.mangaList.lists);

        if(!urlParams.get("tiers")){
            let atlTierString: RegExpMatchArray;
            if(response.data.User.about) 
                atlTierString = (response.data.User.about as string).match(new RegExp("(?<=<atl>)(.*?)(?=<\/atl>)"));
            if(atlTierString && atlTierString.length != 0)
                userStore.tiersStructure = stringToTiers(atlTierString[0]);
            else
                userStore.tiersStructure = setupDefaultTiers(userStore.anilistUser.mediaListOptions.scoreFormat);
        }
    }
    else console.error("No user found with this name");
}
</script>