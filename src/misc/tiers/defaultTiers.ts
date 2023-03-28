import type { Tier } from "../types"

/*export const groupsColors = {
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-amber-400",
    C: "bg-yellow-300",
    D: "bg-lime-400",
    E: "bg-green-400"
}*/

export const tenScoreFormat: Tier[] = [
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
    },
    {
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

export const hundredScoreFormat: Tier[] =
[
    {
        name: "S",
        color: "bg-red-400",
        from: 100,
        to: 100
    },
    {
        name: "A",
        color: "bg-orange-400",
        from: 100,
        to: 90
    },
    {
        name: "B",
        color: "bg-amber-400",
        from: 90,
        to: 80
    },
    {
        name: "C",
        color: "bg-yellow-300",
        from: 80,
        to: 70
    },
    {
        name: "D",
        color: "bg-lime-400",
        from: 70,
        to: 60
    },
    {
        name: "E",
        color: "bg-green-400",
        from: 60,
        to: 1
    }
]

export const fiveScoreFormat: Tier[] = 
[
    {
        name: "S",
        color: "bg-red-400",
        from: 5,
        to: 5
    },
    {
        name: "A",
        color: "bg-orange-400",
        from: 4,
        to: 4
    },
    {
        name: "B",
        color: "bg-amber-400",
        from: 3,
        to: 3
    },
    {
        name: "C",
        color: "bg-yellow-300",
        from: 2,
        to: 2
    },
    {
        name: "D",
        color: "bg-lime-400",
        from: 1,
        to: 1
    }
]

export const threeScoreFormat: Tier[] =
[
    {
        name: "S",
        color: "bg-red-400",
        from: 3,
        to: 3
    },
    {
        name: "A",
        color: "bg-orange-400",
        from: 2,
        to: 2
    },
    {
        name: "B",
        color: "bg-amber-400",
        from: 1,
        to: 1
    }
]