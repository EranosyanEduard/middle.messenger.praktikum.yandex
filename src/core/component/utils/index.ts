import {Component} from "~/src/core/component"
import {TRecord} from "~/src/models/common"

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
 * @param component компонент.
 */
function renderDOM<P extends TRecord>(selector: string, component: Component<P>): void | never {
    const errorMessages = getRenderErrorMessages(selector)
    try {
        const node = document.querySelector(selector)
        if (node != null) {
            node.append(component.content)
            component.dispatchComponentDidMount()
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
