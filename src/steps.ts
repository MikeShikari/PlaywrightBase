import { DataObject, SelectorObject, TextObject } from "./customTypes";
import { Methods } from "./selectorMethods";
import { test, expect, Page } from '@playwright/test'


export class TestSteps extends Methods {
    constructor(page: Page) {
        super(page)
    }


    async step_checkVisibilitySelector(selectorObject: SelectorObject) {
        await test.step(`Проверка селектора с описанием "${selectorObject.description}" на видимость на странице`, async () => {
            await this.checkVisibility(selectorObject)
        })
    }

    async step_checkVisibilityText(textObject: TextObject) {
        const selectorObject = await this.textConverter(textObject)
        await test.step(`Проверка текста с описанием "${selectorObject.description}" на видимость на странице`, async () => {
            await this.checkVisibility(selectorObject)
        })
    }

    async step_checkSelectorNotVisible(selectorObject: SelectorObject) {
        await test.step(`Проверка отсутствия селектора с описанием "${selectorObject.description}" на странице`, async () => {
            await this.checkSelectorNotVisible(selectorObject)
        })
    }

    async step_checkTextNotVisible(textObject: TextObject) {
        const selectorObject = await this.textConverter(textObject)
        await test.step(`Проверка отсутствия текста с описанием "${selectorObject.description}" на странице`, async () => {
            await this.checkSelectorNotVisible(selectorObject)
        })
    }

    async step_fillAndValueCheckSelector(selectorObject: SelectorObject, dataObject: DataObject) {
        const resolve = typeof dataObject.isValueCheck != "undefined" ? dataObject.isValueCheck : false
        if (!resolve) {
            await test.step(`Заполнение селектора с описанием "${selectorObject.description}" данными "${dataObject.data}" с описанием "${dataObject.description}"`, async () => {
                await this.fillAndValueCheckSelector(selectorObject, dataObject)
            })
        } else {
            await test.step(`Проверка селектора с описанием "${selectorObject.description}" на заполнение данными "${dataObject.data}" с описанием "${dataObject.description}"`, async () => {
                await this.fillAndValueCheckSelector(selectorObject, dataObject)
            })
        }
    }

    async step_clickSelector(selectorObject: SelectorObject) {
        await test.step(`Проверка нажатия на селектор с описанием "${selectorObject.description}"`, async () => {
            await this.clickSelector(selectorObject)
        })
    }

    async step_clickText(textObject: TextObject) {
        const selectorObject = await this.textConverter(textObject)
        await test.step(`Проверка нажатия на текст с описанием "${selectorObject.description}"`, async () => {
            await this.clickSelector(selectorObject)
        })
    }
}