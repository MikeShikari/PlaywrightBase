import { MainPageMethods } from "../pageObjectModels/mainPage/methods";
import {test, Page} from '@playwright/test'

test.describe('Main page tests', ()=>{
    test('Main page test 1', async({page}) => {
        const MPM = new MainPageMethods(page)
        await MPM.navigateAndCloseModal()
    })
})
