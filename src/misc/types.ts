export interface User {
    id?: number,
    name?: string,
    avatar?: {
        medium?: string
    },
    mediaListOptions?: {
        scoreFormat?: ScoreFormat
    }
}

export interface Settings {
    tiers: Tiers[]
}

export interface Tiers {
    name: String,
    color: String,
    from: number | null,
    to: number | null
}

export enum ScoreFormat{
    POINT_100,
    POINT_10_DECIMAL,
    POINT_10,
    POINT_5,
    POINT_3
}