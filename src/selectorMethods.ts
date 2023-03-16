import { Page, test, expect, Locator } from '@playwright/test'
import { SelectorObject, TextObject, DataObject, DateObject, Resolver } from './customTypes'


/**
 * Класс основных методов для шагов в тестах
 *
 * @export
 * @class Methods
 */
export class Methods {
    public page: Page
    constructor(page: Page) {
        this.page = page
    }


    /**
     *
     * Конвертер текста в селектор для упрощения методов
     * @param {TextObject} textObject
     * @return {*}  {Promise<SelectorObject>}
     * @memberof Methods
     */
    async textConverter(textObject: TextObject): Promise<SelectorObject> {
        const selectorObject = {
            selector: this.page.getByText(textObject.text, {exact:true}),
            description: textObject.description,
            options: typeof textObject.options != "undefined" ? textObject.options : {}
        }
        return selectorObject
    }


    /**
     *
     * Перевод опций объекта селектора в приемлимый для TS вид
     * @param {SelectorObject} selectorObject
     * @return {*}  {Promise<Resolver>}
     * @memberof Methods
     */
    async optionsResolver(selectorObject: SelectorObject): Promise<Resolver> {
        const nth = typeof selectorObject.options != "undefined" ? (typeof selectorObject.options.nth != "undefined" ? selectorObject.options.nth : 0) : 0
        const clickNeeded = typeof selectorObject.options != "undefined" ? (typeof selectorObject.options.click != "undefined" ? true : false) : false
        var containsText = false
        var text = ''
        if (typeof selectorObject.options != "undefined") {
            if (typeof selectorObject.options.text != "undefined") {
                containsText = true
                text = selectorObject.options.text
            } else {
                containsText = false
                text = ''
            }
        } else {
            containsText = false
            text = ''
        }
        return {
            nth: nth,
            containsText: containsText,
            clickNeeded: clickNeeded,
            text: text
        }
    }


    /**
     *
     * Проверка видимости селектора или текста
     * @param {SelectorObject} selectorObject
     * @memberof Methods
     */
    async checkVisibility(selectorObject: SelectorObject) {
        const nth = (await this.optionsResolver(selectorObject)).nth
        const locator = selectorObject.selector.nth(nth)
        await locator.waitFor({ state: "attached", timeout: 5000 })
        await expect(locator).toBeVisible()
    }


    /**
     *
     * Проверка отсутствия селектора или текста
     * @param {SelectorObject} selectorObject
     * @memberof Methods
     */
    async checkSelectorNotVisible(selectorObject: SelectorObject) {
        const nth = (await this.optionsResolver(selectorObject)).nth
        const locator = selectorObject.selector.nth(nth)
        await expect(locator).toBeHidden()
    }


    /**
     *
     * Проверка нажатия на селектор или текст
     * @param {SelectorObject} selectorObject
     * @memberof Methods
     */
    async clickSelector(selectorObject: SelectorObject) {
        const options = await this.optionsResolver(selectorObject)
        const locator = options.containsText ? selectorObject.selector.getByText(options.text).nth(options.nth) : selectorObject.selector.nth(options.nth)
        if (options.clickNeeded) {
            await locator.click({timeout:5000})
        } else {
            throw new Error('Not clickable in code, change data file')
        }
    }


    /**
     *
     * Заполнение селектора данными и/или проверка заполненного значения
     * @param {SelectorObject} selectorObject
     * @param {DataObject} dataObject
     * @memberof Methods
     */
    async fillAndValueCheckSelector(selectorObject: SelectorObject, dataObject: DataObject) {
        const options = await this.optionsResolver(selectorObject)
        const valueCheck = typeof dataObject.isValueCheck != "undefined" ? dataObject.isValueCheck : false
        const locator = selectorObject.selector.nth(options.nth)
        if (!valueCheck) {
            await locator.fill(dataObject.data)
        }
        await expect(locator).toHaveValue(dataObject.data)
    }


    /**
     *
     * Навигация по ссылке
     * @param {DataObject} dataObject
     * @memberof Methods
     */
    async navigate(dataObject: DataObject){
        const isUrl = typeof dataObject.isUrl != 'undefined' ? dataObject.isUrl : false
        if(isUrl){
            const responsePromise = this.page.waitForResponse(dataObject.data)
            await this.page.goto(dataObject.data)
            const response = await responsePromise
            expect(response.ok()).toBe(true)
        }
    }
}