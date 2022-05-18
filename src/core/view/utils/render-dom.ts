import {IView, Obj} from "../models"

function getRenderErrorMessages(selector: string) {
    return {
        notFoundElement: `Элемент с селектором "${selector}" отсутствует`,
        notFoundSelector: `Недопустимый селектор ${selector}`,
        unexpected: "Неожиданная ошибка при вызове функции renderDOM",
    }
}

/**
 * Добавить контент компонента [component] в элемент с селектором [selector].
 * @param selector css-селектор элемента.
 * @param view представление.
 */
function renderDOM<P extends Obj, S extends string>(
    selector: string,
    view: IView<P, S>,
): void | never {
    const errorMessages = getRenderErrorMessages(selector)
    try {
        const node = document.querySelector(selector)
        if (node != null) {
            node.append(view.element)
            view.dispatchDidMount()
        } else {
            throw new Error(errorMessages.notFoundElement)
        }
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === errorMessages.notFoundElement) {
                throw new Error(e.message)
            }
            throw new Error(errorMessages.notFoundSelector)
        }
        throw new Error(errorMessages.unexpected)
    }
}

export default renderDOM
