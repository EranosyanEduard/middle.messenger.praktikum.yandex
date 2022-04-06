import {Input} from "~/src/components"
import {IComp} from "~/src/core/component/models"
import {TRecord} from "~/src/models/common"
import {TOptions, TProps} from "../models"

/**
 * Фабрика экземпляров класса Input.
 * @param optionsList список объектов, необходимых для создания экземпляра класса Input.
 */
function factory(optionsList: TOptions[]): Input[] {
    return optionsList.map((options) => new Input({...options}))
}

/**
 * Извлечь значения из списка полей ввода.
 * @param inputList список полей ввода.
 */
function getValues(inputList: Input[]): TRecord<string> {
    return inputList.reduce((acc, field) => {
        const [id, val] = field.getProps(["id", "value"], (key) => key)
        acc[id] = val
        return acc
    }, {} as TRecord<string>)
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
        id: "email",
        label: "Электронная почта",
        labelClassName: "",
        name: "email",
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
        id: "firstName",
        label: "Имя пользователя",
        labelClassName: "",
        name: "firstName",
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
        id: "login",
        label: "Логин",
        labelClassName: "",
        name: "login",
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
        id: "nickName",
        label: "Имя в чате",
        labelClassName: "",
        name: "nickName",
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
        id: "password",
        label: "Пароль",
        labelClassName: "",
        name: "password",
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
        id: "passwordAgain",
        label: "Повторите пароль",
        labelClassName: "",
        name: "passwordAgain",
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
        id: "passwordNew",
        label: "Новый пароль",
        labelClassName: "",
        name: "passwordNew",
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
        id: "phone",
        label: "Телефон",
        labelClassName: "",
        name: "phone",
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
        id: "secondName",
        label: "Фамилия пользователя",
        labelClassName: "",
        name: "secondName",
        type: "text",
        value: "",
    },
}

export {
    factory,
    getValues,
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
