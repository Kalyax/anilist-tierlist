import { tenScoreFormat, hundredScoreFormat, fiveScoreFormat, threeScoreFormat } from "./defaultTiers";
import { Entry, List, MediaFormat, ScoreFormat, Tier } from "../types";

export const setupDefaultTiers = (scoreFormat: ScoreFormat): Array<Tier> | undefined => {
    if(scoreFormat == ScoreFormat.POINT_10 || scoreFormat == ScoreFormat.POINT_10_DECIMAL)
        return tenScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_100)
        return hundredScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_5)
        return fiveScoreFormat;
    else if(scoreFormat == ScoreFormat.POINT_3)
        return threeScoreFormat;
}

export const toEntryList = (lists: Array<List>): Array<Entry> => {
    //to prevent duplication due to custom lists
    const mediaIdSet = new Set();
    const entryList = new Array<Entry>;

    for(let list of lists){
        for(let entry of list.entries){
            if(mediaIdSet.has(entry.media.id)) continue;
            else {
                mediaIdSet.add(entry.media.id)
                entryList.push(entry)
            }
        }
    }

    return entryList
}

/*test usernames
10 points decimal: Kalyax
10 points: ?
100 points: valgul
5 star: readz
3 star: ?*/

//Takes a list of entries and structures them into tiers according to the given tier structure
export const structureEntries = (entryList: Array<Entry>, tiersStructure: Array<Tier>, hiddenFormats: Array<MediaFormat>): Array<Array<Entry>> => {
    let structuredEntries: Array<Array<Entry>> = tiersStructure.map(x => []);

    for(let entry of entryList){
        if(hiddenFormats.includes(entry.media.format)) continue;

        //FROM 1 TO 10 // ASCENDING // FROM INCLUDED
        for(let tierIndex in tiersStructure){
            let tier: Tier = tiersStructure[tierIndex];

            if(tier.to === null || tier.from === null) continue;
            if((tier.from == tier.to && tier.from == entry.score)||(entry.score >= tier.from && entry.score < tier.to)){
                const currentTier = structuredEntries[tierIndex];
                let entryIndex = 0;
                while(entryIndex < currentTier.length && currentTier[entryIndex].score >= entry.score){
                    entryIndex++;
                }
                structuredEntries[tierIndex] = insert(currentTier, entryIndex, entry)
            }
        }
    }

    return structuredEntries;
}

//insert item in an array at a certain index
const insert = (arr: Array<any>, index: number, newItem: any) => [...arr.slice(0, index), newItem, ...arr.slice(index)]