export const groupsColors = {
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-amber-400",
    C: "bg-yellow-300",
    D: "bg-lime-400",
    E: "bg-green-400"
}

/**
 * Returns all tiers where there's is at least one element
 * @param data
 */
export function buildGroups(data: any){
    let groupList: string[] = []
    for(let key of Object.keys(data)){
        if (data[key].length > 0){
            groupList.push(key)
        }
    }
    return groupList
}

/** Sorts data retrived by the API call
 * @param data
 */
export function formatMedia(data: any, scoreFormat: string){
    //TODO: factorize code later
    let entries;
    if(scoreFormat == "POINT_100" || scoreFormat == "POINT_10_DECIMAL" || scoreFormat == "POINT_10"){
        entries = <any>{
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            E: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number;

                if(scoreFormat == "POINT_100") score = Math.floor(entry.score/10)
                else if(scoreFormat == "POINT_10_DECIMAL") score = Math.floor(entry.score)
                else score = entry.score

                if(entry.score != 0){
                    if(score == 10) entries.S.push(entry)
                    else if(score == 9) entries.A.push(entry)
                    else if(score == 8) entries.B.push(entry)
                    else if(score == 7) entries.C.push(entry)
                    else if(score == 6) entries.D.push(entry)
                    else entries.E.push(entry)
                }
            }
        }
    }
    else if(scoreFormat == "POINT_5"){
        entries = <any>{
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            E: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number = entry.score

                if(score != 0){
                    if(score == 5) entries.S.push(entry)
                    else if(score == 4) entries.A.push(entry)
                    else if(score == 3) entries.B.push(entry)
                    else if(score == 2) entries.C.push(entry)
                    else entries.D.push(entry)
                }
            }
        }
    }
    else if(scoreFormat == "POINT_3"){
        entries = <any>{
            S: [],
            A: [],
            B: []
        };

        for(let list of data.MediaListCollection.lists){
            if(list.isCustomList) break;
            for(let entry of list.entries){
                let score: number = entry.score

                if(score != 0){
                    if(score == 3) entries.S.push(entry)
                    else if(score == 2) entries.A.push(entry)
                    else entries.B.push(entry)
                }
            }
        }
    }
    return entries
}