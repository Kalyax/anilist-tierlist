import { ScoreFormat } from "../types";
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

    let i = 0;

    userStore.sortedTiers = []
    while(i < userStore.tiers.length){
        userStore.sortedTiers.push([])
        i++;
    }

    for(let list of userStore.lists){
        if(list.isCustomList) continue;
        for(let entry of list.entries){
            for(let i in userStore.tiers){
                let tier = userStore.tiers[i]
                if(tier.to == null || tier.from == null) continue;
                if((tier.to == tier.from && entry.score == tier.from)||(entry.score < tier.from && entry.score >= tier.to)){
                    console.log(tier.name)
                    userStore.sortedTiers[i].push(entry)
                }
            }
        }
    }
}