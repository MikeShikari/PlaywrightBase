import { Page } from "@playwright/test";
import { DataObject, SelectorObject, TextObject } from "../../src/customTypes";
import { TestSteps } from "../../src/steps";

export class MainPageData extends TestSteps {
    constructor (page: Page){
        super(page)
    }

    readonly burgerMenu: SelectorObject = {
        selector:this.page.locator("button.top-line__burger-svg-wrap"),
        description: "Burger menu main page"

    }

    readonly pageUrl: DataObject = {
        data:"https://www-release.goulash.tech",
        description: "Main page",
        isUrl:true
    }
    readonly citySelectModal: SelectorObject = {
        selector: this.page.locator("div.city-select-wrapper"),
        description: "City select modal"
    }
    readonly confirmCity: TextObject = {
        text: "Да",
        description: "Confirm city",
        options:{
            click: true
        }
    }
}