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
    to: number | null,
    entries?: Array<Entry>
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
    format: MediaFormat,
    title: {
        english: string
    }
    coverImage: {
        medium: string
    }
}

export interface Settings {
    sortedTiers: Array<Array<Entry>>,
    hiddenFormats: Array<MediaFormat>
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

export enum MediaFormat {
    TV = "TV",
    TV_SHORT = "TV_SHORT",
    MOVIE = "MOVIE",
    SPECIAL = "SPECIAL",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "MUSIC",
    MANGA = "MANGA",
    NOVEL = "NOVEL",
    ONE_SHOT = "ONE_SHOT"
}