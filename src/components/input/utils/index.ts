import {Input} from "~/src/components"
import {TRecord} from "~/src/models/common"
import rules from "./validation-rules"
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
function getValues(inputList: Input[]): TRecord<string> {
    return inputList.reduce((acc, field) => {
        const [id, val] = field.getProps(["id", "value"], (key) => key)
        acc[id] = val
        return acc
    }, {} as TRecord<string>)
}

/**
 * Определить валидность списка полей ввода.
 * @param inputList список полей ввода.
 */
function isValid(inputList: Input[]): boolean {
    return inputList.every((it) => {
        const [error] = it.getProps(["error"], () => "")
        return error.length > 0
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
        id: "firstName",
        inputClassName: "",
        label: "Имя пользователя",
        labelClassName: "",
        name: "firstName",
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

const nickNameOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "nickName",
        inputClassName: "",
        label: "Имя в чате",
        labelClassName: "",
        name: "nickName",
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
        id: "passwordAgain",
        inputClassName: "",
        label: "Повторите пароль",
        labelClassName: "",
        name: "passwordAgain",
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
        id: "passwordNew",
        inputClassName: "",
        label: "Новый пароль",
        labelClassName: "",
        name: "passwordNew",
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

const secondNameOptions: TOptions = {
    props: {
        bemBlock: "field",
        error: "",
        fieldWrapperClassName: "",
        headClassName: "",
        id: "secondName",
        inputClassName: "",
        label: "Фамилия пользователя",
        labelClassName: "",
        name: "secondName",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

export {
    factory,
    getValues,
    isValid,
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
