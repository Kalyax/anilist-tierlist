export function mediaFormatString(str){
    switch(str){
        case "TV_SHORT":
            return "TV Short";
        case "MOVIE":
            return "Movie";
        case "SPECIAL":
            return "Special";
        case "MUSIC":
            return "Music";
        case "MANGA":
            return "Manga";
        case "NOVEL":
            return "Novel";
        case "ONE_SHOT":
            return "One Shot";
        default:
            return str;
    }
}