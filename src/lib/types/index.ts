export const enum MainContentData {
    Anime = 'anime',
    Manga = 'manga'
}

export type MainContent = MainContentData




// To parse this data:
//
//   import { Convert, Manga } from "./file";
//
//   const manga = Convert.toManga(json);

export interface Pagination {
    pagination: PaginationClass;
}

export interface PaginationClass {
    last_visible_page: number;
    has_next_page:     boolean;
    items:             Items;
}

export interface Items {
    count:    number;
    total:    number;
    per_page: number;
}

export interface Relation {
    relation: string
    entry:    Entry[]
}

export interface Entry {
    mal_id: number
    type:   string
    name:   string
    url:    string
}