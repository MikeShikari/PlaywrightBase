import { Page } from "@playwright/test";
import { DataObject, SelectorObject, TextObject } from "../../src/customTypes";
import { TestSteps } from "../../src/steps";


export class CartData extends TestSteps{
    constructor(page:Page){
        super(page)
    }

 
    readonly cartButton: SelectorObject ={
        selector: this.page.locator("a.cart"),
        description: "Корзина (кнопка)",
        options:{
            click:true
        }
    }
 
    readonly textEmptyCart: TextObject = {
        text: "Ваша корзина еще пуста",
        description: "Текст пустой корзины"
    }
}