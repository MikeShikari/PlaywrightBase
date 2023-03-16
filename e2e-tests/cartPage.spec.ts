import {test} from '@playwright/test'
import { CartMethods } from '../pageObjectModels/cartTests/methods'


test.describe('Тесты корзины', ()=>{
    test('Проверка пустой корзины', async({page})=>{
        const CM = new CartMethods(page)
        await CM.checkEmptyCart()
    })
})