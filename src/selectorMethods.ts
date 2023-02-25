import { Page, test, expect, Locator } from '@playwright/test'
import { SelectorObject, TextObject, DataObject, DateObject, Resolver } from './customTypes'


export class Methods {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }
    async textConverter(textObject: TextObject): Promise<SelectorObject> {
        const selectorObject = {
            selector: this.page.getByText(textObject.text),
            description: textObject.description,
            options: typeof textObject.options != "undefined" ? textObject.options : {}
        }
        return selectorObject
    }

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


    async checkVisibility(selectorObject: SelectorObject) {
        const nth = (await this.optionsResolver(selectorObject)).nth
        const locator = selectorObject.selector.nth(nth)
        await locator.waitFor({ state: "attached" })
        await expect(locator).toBeVisible()
    }

    async checkSelectorNotVisible(selectorObject: SelectorObject) {
        const nth = (await this.optionsResolver(selectorObject)).nth
        const locator = selectorObject.selector.nth(nth)
        await expect(locator).toBeHidden()
    }

    async clickSelector(selectorObject: SelectorObject) {
        const options = await this.optionsResolver(selectorObject)
        const locator = options.containsText ? selectorObject.selector.getByText(options.text).nth(options.nth) : selectorObject.selector.nth(options.nth)
        if (options.clickNeeded) {
            await locator.click()
        } else {
            throw new Error('Not clickable in code, change data file')
        }
    }

    async fillAndValueCheckSelector(selectorObject: SelectorObject, dataObject: DataObject) {
        const options = await this.optionsResolver(selectorObject)
        const valueCheck = typeof dataObject.isValueCheck != "undefined" ? dataObject.isValueCheck : false
        const locator = selectorObject.selector.nth(options.nth)
        if (!valueCheck) {
            await locator.fill(dataObject.data)
        }
        await expect(locator).toHaveValue(dataObject.data)
    }
}