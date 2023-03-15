import { Page } from "@playwright/test";
import { MainPageData } from "./data";

export class MainPageMethods extends MainPageData{
    constructor(page:Page){
        super(page)
    }

    async navigateAndCloseModal(){
        await this.step_navigate(this.pageUrl)
        // await this.page.pause()
        await this.step_checkVisibilitySelector(this.citySelectModal)
        await this.step_clickText(this.confirmCity)
        await this.step_clickText(this.confirmCity)
        await this.step_checkSelectorNotVisible(this.citySelectModal)
        await this.step_checkVisibilitySelector(this.burgerMenu)
    }
}