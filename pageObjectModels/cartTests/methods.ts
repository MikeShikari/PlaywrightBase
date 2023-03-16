import { Page } from "@playwright/test";
import { CartData } from "./data";
import { MainPageMethods } from "../mainPage/methods";


export class CartMethods extends CartData{
    constructor(page:Page){
        super(page)
    }

    async checkEmptyCart(){
        const MP = new MainPageMethods(this.page)
        await MP.navigateAndCloseModal()
        await this.step_clickSelector(this.cartButton)
        await this.step_checkVisibilityText(this.textEmptyCart)


    }
}