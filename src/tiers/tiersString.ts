import { Tier } from "@/types";

//default_10: S;color;10;10;E
export const tiersToString = (tiersStructure: Array<Tier>): string => {
    let tiersString = [];
    for(let tier of tiersStructure){
        tiersString.push(tier.name, ";", tier.color.substring(3, tier.color.length - 4), ";", tier.from, ";", tier.to, ";");
    }
    tiersString.pop();
    return tiersString.join("");
}

export const stringToTiers = (tiersString: string) => {
    let tiersStructure = [];
    let tiersArray = tiersString.split(";");

    let i = 0;
    while(tiersArray.length != 0){
        let tier = {
            name: tiersArray.shift(),
            color: "bg-" + tiersArray.shift() + "-400",
            from: tiersArray.shift() as unknown as number,
            to: tiersArray.shift() as unknown as number
        } as unknown as Tier;
    
        tiersStructure.push(tier);
        i += 4;
    }

    return tiersStructure;
}