import { Locator } from "@playwright/test"
export type SelectorObject = {
    selector: Locator,
    description: string,
    options?: {
        nth?: number,
        click?: boolean,
        text?: string,
    }
}
export type TextObject = {
    text: string,
    description: string,
    options?: {
        nth?: number,
        click?: boolean,
    }
}

export type DataObject = {
    data: string,
    description: string,
    isUrl?: boolean,
    isValueCheck?: boolean
}

export type DateObject = {
    date: string,
    description: string,
}
export type Resolver = {
    nth: number,
    clickNeeded: boolean,
    containsText: boolean,
    text: string
}