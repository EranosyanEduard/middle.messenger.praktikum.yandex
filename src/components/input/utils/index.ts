import {Input} from "~/src/components"
import {TRecord} from "~/src/models/common"
import rules, {xValidationErrorMessages} from "./validation-rules"
import {TOptions} from "../models"

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
function getValues<R extends TRecord<string>>(inputList: Input[]): R {
    return inputList.reduce<TRecord<string>>((acc, field) => {
        const [id, val] = field.getProps(["id", "value"], (key) => key)
        acc[id] = val
        return acc
    }, {}) as R
}

/**
 * Определить валидность списка полей ввода.
 * @param inputList список полей ввода.
 */
function isValid(inputList: Input[]): boolean {
    return inputList.every((it) => {
        const [error] = it.getProps(["error"], () => "")
        return error.length === 0
    })
}

/**
 * Сбросить значения полей ввода.
 * @param inputList список полей ввода.
 */
function reset(inputList: Input[]) {
    inputList.forEach((it) => {
        it.props = {
            error: "",
            value: "",
        }
    })
}

const emailOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "email",
        inputClassName: "",
        label: "Электронная почта",
        labelClassName: "",
        name: "email",
        rules: [rules.required, rules.email],
        type: "email",
        value: "",
    },
}

const firstNameOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "first_name",
        inputClassName: "",
        label: "Имя пользователя",
        labelClassName: "",
        name: "first_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

const loginOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "login",
        inputClassName: "",
        label: "Логин",
        labelClassName: "",
        name: "login",
        rules: [rules.required, rules.login, rules.loginMinLength, rules.loginMaxLength],
        type: "text",
        value: "",
    },
}

const messageOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "d_none",
        id: "message",
        inputClassName: "",
        label: "",
        labelClassName: "",
        name: "message",
        rules: [],
        type: "text",
        value: "",
    },
}

const nickNameOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "display_name",
        inputClassName: "",
        label: "Имя в чате",
        labelClassName: "",
        name: "display_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

const passwordOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "password",
        inputClassName: "",
        label: "Пароль",
        labelClassName: "",
        name: "password",
        rules: [
            rules.required,
            rules.passwordMinLength,
            rules.hasCapitalizedLetter,
            rules.hasDigit,
            rules.hasNotSpace,
            rules.passwordMaxLength,
        ],
        type: "password",
        value: "",
    },
}

const passwordAgainOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "againPassword",
        inputClassName: "",
        label: "Повторите пароль",
        labelClassName: "",
        name: "againPassword",
        rules: [
            rules.required,
            rules.passwordMinLength,
            rules.hasCapitalizedLetter,
            rules.hasDigit,
            rules.hasNotSpace,
            rules.passwordMaxLength,
        ],
        type: "password",
        value: "",
    },
}

const passwordNewOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "newPassword",
        inputClassName: "",
        label: "Новый пароль",
        labelClassName: "",
        name: "newPassword",
        rules: [
            rules.required,
            rules.passwordMinLength,
            rules.hasCapitalizedLetter,
            rules.hasDigit,
            rules.hasNotSpace,
            rules.passwordMaxLength,
        ],
        type: "password",
        value: "",
    },
}

const phoneOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "phone",
        inputClassName: "",
        label: "Телефон",
        labelClassName: "",
        name: "phone",
        rules: [rules.required, rules.phone, rules.phoneMinLength, rules.phoneMaxLength],
        type: "tel",
        value: "",
    },
}

const searchOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "d_none",
        id: "search",
        inputClassName: "",
        label: "",
        labelClassName: "",
        name: "search",
        rules: [],
        type: "text",
        value: "",
    },
}

const secondNameOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "second_name",
        inputClassName: "",
        label: "Фамилия пользователя",
        labelClassName: "",
        name: "second_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

export {
    factory,
    getValues,
    isValid,
    reset,
    emailOptions,
    firstNameOptions,
    loginOptions,
    messageOptions,
    nickNameOptions,
    passwordOptions,
    passwordAgainOptions,
    passwordNewOptions,
    phoneOptions,
    searchOptions,
    secondNameOptions,
    xValidationErrorMessages,
}
