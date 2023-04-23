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

    //to prevent duplication due to custom lists
    const mediaIdSet = new Set();

    let i = 0;

    userStore.settings.sortedTiers = []
    while(i < userStore.tiers.length){
        userStore.settings.sortedTiers.push([])
        i++;
    }

    for(let list of userStore.lists){
        for(let entry of list.entries){
            //check if this kind of media is hidden
            if(userStore.settings.hiddenFormats.includes(entry.media.format)) continue;
            if(mediaIdSet.has(entry.media.id)) continue;

            for(let i in userStore.tiers){
                let tier = userStore.tiers[i]

                if(tier.to == null || tier.from == null) continue;
                if((tier.to == tier.from && entry.score == tier.from)||(entry.score < tier.from && entry.score >= tier.to)){
                    //sorts entries in ascending order by score
                    const sortedTier = userStore.settings.sortedTiers[i];
                    let j = 0;
                    while(j < sortedTier.length && sortedTier[j].score >= entry.score){
                        j++;
                    }
                    userStore.settings.sortedTiers[i] = insert(sortedTier, j as unknown as number, entry)
                    mediaIdSet.add(entry.media.id)
                }
            }
        }
    }
}

//insert item in an array at a certain index
const insert = (arr: Array<any>, index: number, newItem: any) => [...arr.slice(0, index), newItem, ...arr.slice(index)]