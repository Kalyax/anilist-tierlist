export interface User {
    id: number,
    name: string,
    avatar: {
        medium: string
    },
    mediaListOptions: {
        scoreFormat: ScoreFormat
    }
}

export interface Tier {
    name: String,
    color: String,
    from: number | null,
    to: number | null
}

export interface List {
    isCustomList: boolean,
    entries: Array<Entry>
}

export interface Entry{
    score: number,
    media: Media
}

export interface Media {
    id: number,
    siteUrl: string,
    title: {
        english: string
    }
    coverImage: {
        medium: string
    }
}

export enum MediaType{
    ANIME,
    MANGA
}

export enum ScoreFormat{
    POINT_100 = "POINT_100",
    POINT_10_DECIMAL = "POINT_10_DECIMAL",
    POINT_10 = "POINT_10",
    POINT_5 = "POINT_5",
    POINT_3 = "POINT_3"
}