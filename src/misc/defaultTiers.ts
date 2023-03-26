import type { Tiers } from "./types"

export const groupsColors = {
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-amber-400",
    C: "bg-yellow-300",
    D: "bg-lime-400",
    E: "bg-green-400"
}

export const tenScoreFormat: Tiers[] = [
    {
        name: "S",
        color: "bg-red-400",
        from: 10,
        to: 10
    },
    {
        name: "A",
        color: "bg-orange-400",
        from: 10,
        to: 9
    },
    {
        name: "B",
        color: "bg-amber-400",
        from: 9,
        to: 8
    },{
        name: "C",
        color: "bg-yellow-300",
        from: 8,
        to: 7
    },
    {
        name: "D",
        color: "bg-lime-400",
        from: 7,
        to: 6
    },
    {
        name: "E",
        color: "bg-green-400",
        from: 6,
        to: 1
    }
]