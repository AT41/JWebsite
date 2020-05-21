export interface BaseCard {
    Id: number;
    CardOwner: number;
}
  
export interface Card extends BaseCard {
    WordType: WordType;
    Kanji: string;
    Furigana: string;
    Answer: string;
    SetId: number;
}

export interface KanjiCard extends BaseCard {
    Kanji: string;
    Onyomi: string;
    Kunyomi: string;
    English: string;
    SetId: number; // TODO Move this into BaseCard
}

export interface Superset {
    Id: number;
    SupersetName: string;
    SupersetDescription: string;
    SupersetOwner: string;
}

export interface Set {
    Id: number;
    SetOwner: string;
    SetName: string;
    SupersetId: number;
    CardType: CardType;
}

export enum CardType {
    basic = "basic",
    kanji = "kanji"
}

export type WordType = "na-adjective" | "i-adjective" | "ru-verb" | "u-verb" | "irregular-verb" | "noun" | "adverb" | "pronoun" | "kanji" | "other"

export interface Stats {
    CardId: number;
    StatOwner: string;
    Correct: number;
    Incorrect: number;
}