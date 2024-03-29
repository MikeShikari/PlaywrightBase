import { Locator } from "@playwright/test"
export type SelectorObject = {
    selector: Locator,  // Локатор селектора. Пример: this.page.locator("ТУТ CSS СЕЛЕКТОР")
    description: string, // Описание селектора. Пример: "Кнопка корзины"
    options?: {
        nth?: number, // Последовательный номер (начиная с 0). Используется если есть одинаковые элементы на странице, по дефолту = 0
        click?: boolean, // Переключатель кликабельности на элемент. Если true  - элемент кликабельный, если false  - на элемент нельзя кликнуть
        text?: string, // Текст содержащийся в селекторе. Например у кнопки с текстом "Сохранить", text: "Сохранить"
    }
}
export type TextObject = {
    text: string, // Текст на странице. !! УКАЗЫВАЕТСЯ ПОЛНЫЙ ТЕКСТ, В КОНСТРУКТОРЕ ПОКА НЕТ ОПЦИИ ЧАСТИЧНОГО ПОИСКА !!
    description: string, // Описание текста. Пример: "Текст ошибки суммы заказа"
    options?: {
        nth?: number, // Последовательный номер (начиная с 0). Используется если есть одинаковые элементы на странице, по дефолту = 0
        click?: boolean, // Переключатель кликабельности на элемент. Если true  - элемент кликабельный, если false  - на элемент нельзя кликнуть
    }
}

export type DataObject = {
    data: string, // Сами данные для заполнения/выбора или ссылка (Если isUrl: true)
    description: string, // Описание данных. Пример: "Данные для заполнения поля 'Введите адресс' " 
    isUrl?: boolean, // Переключатель типа данных с текста на ссылку (Если isUrl: true - данные являются ссылкой, если isUrl: false - данные является текстом/цифрами)
    isValueCheck?: boolean /* Переключатель проверки введенных данных. Используется при форматировании текста на фронте. Пример: есть поле ввода телефона, пользователь вводит "89090123456", а отображается "+7(909)-012-34-56", 
    в таком случае, если мы хотим проверить, что значение действительно такое, какое ожидалось, мы проверяем через DataObject с isValueCheck: true*/
}















//!! СИСТЕМНЫЕ ТИПЫ, НЕ ТРОГАТЬ
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