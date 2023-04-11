import { MediaFormat, ScoreFormat } from "../types";
import { tenScoreFormat, hundredScoreFormat, fiveScoreFormat, threeScoreFormat } from "./defaultTiers";

import { useUserStore } from "@/stores/userStore";

/**
 * setup default tier settings according to scoreFormat value
 * @param userStore 
 */
export function setupDefaultTiers(userStore: any){
    const scoreFormat: ScoreFormat = <ScoreFormat> userStore.info.mediaListOptions?.scoreFormat;
    if(scoreFormat == ScoreFormat.POINT_10 || scoreFormat == ScoreFormat.POINT_10_DECIMAL)
        userStore.tiers = tenScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_100)
        userStore.tiers = hundredScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_5)
        userStore.tiers = fiveScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_3)
        userStore.tiers = threeScoreFormat;
}

/*test usernames
10 points decimal: Kalyax
10 points: ?
100 points: valgul
5 star: readz
3 star: ?*/
export function sortMedia(){
    const userStore = useUserStore()

    const mediaIdSet = new Set();

    let i = 0;

    userStore.settings.sortedTiers = []
    while(i < userStore.tiers.length){
        userStore.settings.sortedTiers.push([])
        i++;
    }

    for(let list of userStore.lists){
        //if(list.isCustomList) continue;
        for(let entry of list.entries){
            if(userStore.settings.hiddenFormats.includes(entry.media.format)) continue;
            if(mediaIdSet.has(entry.media.id)) continue;
            for(let i in userStore.tiers){
                let tier = userStore.tiers[i]
                if(tier.to == null || tier.from == null) continue;
                if((tier.to == tier.from && entry.score == tier.from)||(entry.score < tier.from && entry.score >= tier.to)){
                    userStore.settings.sortedTiers[i].push(entry)
                    mediaIdSet.add(entry.media.id)
                }
            }
        }
    }
}