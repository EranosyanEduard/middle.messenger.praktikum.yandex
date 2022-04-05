import {IComponent} from "~/src/core/component/models"
import Input from "../index"
import {TProps} from "../models"

/**
 * Обработать событие html-элемента input.
 * @param context ссылка на экземпляр компонента Input.
 * @param event объект event, предусмотренный средой выполнения - браузером.
 */
function handleEvent(context: unknown, event: Event) {
    const input = event.target as HTMLInputElement
    const component = context as IComponent<TProps>
    component.props = {value: input.value}
}

const emailComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "emailField",
        label: "Электронная почта",
        labelClassName: "",
        name: "emailField",
        type: "email",
        value: "",
    },
})

const firstNameComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "firstNameField",
        label: "Имя пользователя",
        labelClassName: "",
        name: "firstNameField",
        type: "text",
        value: "",
    },
})

const loginComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "loginField",
        label: "Логин",
        labelClassName: "",
        name: "loginField",
        type: "text",
        value: "",
    },
})

const nickNameComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "nickNameField",
        label: "Имя в чате",
        labelClassName: "",
        name: "nickNameField",
        type: "text",
        value: "",
    },
})

const passwordComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "passwordField",
        label: "Пароль",
        labelClassName: "",
        name: "passwordField",
        type: "password",
        value: "",
    },
})

const passwordAgainComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "passwordAgainField",
        label: "Повторите пароль",
        labelClassName: "",
        name: "passwordAgainField",
        type: "password",
        value: "",
    },
})

const passwordNewComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "passwordNewField",
        label: "Новый пароль",
        labelClassName: "",
        name: "passwordNewField",
        type: "password",
        value: "",
    },
})

const secondNameComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "secondNameField",
        label: "Фамилия пользователя",
        labelClassName: "",
        name: "secondNameField",
        type: "text",
        value: "",
    },
})

const phoneComp = new Input({
    emits: {
        onBlur(event) {
            handleEvent(this, event)
        },
        onInput(event) {
            handleEvent(this, event)
        },
    },
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "phoneField",
        label: "Телефон",
        labelClassName: "",
        name: "phoneField",
        type: "tel",
        value: "",
    },
})

export {
    emailComp,
    firstNameComp,
    loginComp,
    nickNameComp,
    passwordComp,
    passwordAgainComp,
    passwordNewComp,
    secondNameComp,
    phoneComp,
}
