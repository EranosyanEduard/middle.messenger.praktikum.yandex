import {Input} from "~/src/components"
import {IComp} from "~/src/core/component/models"
import {TOptions, TProps} from "../models"

/**
 * Фабрика экземпляров класса Input.
 * @param optionsList список объектов, необходимых для создания экземпляра класса Input.
 */
function factory(optionsList: TOptions[]): Input[] {
    return optionsList.map((options) => new Input({...options}))
}

/**
 * Обработать событие html-элемента input.
 * @param context ссылка на экземпляр компонента Input.
 * @param event объект event элемента input, предусмотренный средой выполнения - браузером.
 */
function handleEvent(context: IComp<TProps>, event: Event) {
    context.props = {value: (event.target as HTMLInputElement).value}
}

const emailOptions: TOptions = {
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
}

const firstNameOptions: TOptions = {
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
}

const loginOptions: TOptions = {
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
}

const nickNameOptions: TOptions = {
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
}

const passwordOptions: TOptions = {
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
}

const passwordAgainOptions: TOptions = {
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
}

const passwordNewOptions: TOptions = {
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
}

const phoneOptions: TOptions = {
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
}

const secondNameOptions: TOptions = {
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
}

export {
    factory,
    emailOptions,
    firstNameOptions,
    loginOptions,
    nickNameOptions,
    passwordOptions,
    passwordAgainOptions,
    passwordNewOptions,
    phoneOptions,
    secondNameOptions,
}
