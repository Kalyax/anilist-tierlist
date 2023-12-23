//Anilist related interfaces
export interface AnilistUser {
    id: number,
    name: string,
    about: string,
    avatar: {
        medium: string
    },
    options: {
        titleLanguage: UserTitleLanguage
    }
    mediaListOptions: {
        scoreFormat: ScoreFormat
    }
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
        english: string,
        romaji: string,
        native: string
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

export enum UserTitleLanguage {
    ROMAJI = "ROMAJI",
    ENGLISH = "ENGLISH",
    NATIVE = "NATIVE",
    ROMAJI_STYLISED = "ROMAJI_STYLISED",
    ENGLISH_STYLISED = "ENGLISH_STYLISED",
    NATIVE_STYLISED = "NATIVE_STYLISED"
}


//Tierlist related interfaces

export interface Tier {
    name: String,
    color: String,
    from: number | null,
    to: number | null
}