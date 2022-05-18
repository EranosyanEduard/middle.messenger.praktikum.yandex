import {input} from "~/src/components"
import rules, {xValidationErrorMessages} from "./validation-rules"
import {TOptions} from "../models"

/**
 * Фабрика экземпляров полей ввода.
 * @param optsList список опций, необходимых для создания экземпляров полей ввода..
 */
function factory(optsList: TOptions[]): ReturnType<typeof input>[] {
    return optsList.map((opts) => input({...opts}))
}

function isValid(inputList: ReturnType<typeof input>[]) {
    return inputList.every((it) => it.props.error.length === 0)
}

function reset(inputList: ReturnType<typeof input>[]) {
    return inputList.forEach((it) => {
        it.props.error = ""
        it.props.value = ""
    })
}

function values<R extends Record<string, string>>(inputList: ReturnType<typeof input>[]): R {
    return inputList.reduce((acc, it) => {
        acc[it.props.id] = it.props.value
        return acc
    }, <Record<string, string>>{}) as R
}

const avatarOptions: TOptions = {
    props: {
        headClassName: "",
        id: "avatar",
        label: "Аватар",
        name: "avatar",
        rules: [rules.required],
        type: "file",
        value: "",
    },
}

const chatTitleOptions: TOptions = {
    props: {
        headClassName: "",
        id: "chatTitle",
        label: "Название чата",
        name: "chatTitle",
        rules: [rules.required],
        type: "text",
        value: "",
    },
}

const emailOptions: TOptions = {
    props: {
        headClassName: "",
        id: "email",
        label: "Электронная почта",
        name: "email",
        rules: [rules.required, rules.email],
        type: "email",
        value: "",
    },
}

const firstNameOptions: TOptions = {
    props: {
        headClassName: "",
        id: "first_name",
        label: "Имя пользователя",
        name: "first_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

const loginOptions: TOptions = {
    props: {
        headClassName: "",
        id: "login",
        label: "Логин",
        name: "login",
        rules: [rules.required, rules.login, rules.loginMinLength, rules.loginMaxLength],
        type: "text",
        value: "",
    },
}

const messageOptions: TOptions = {
    props: {
        headClassName: "d_none",
        id: "message",
        label: "",
        name: "message",
        rules: [],
        type: "text",
        value: "",
    },
}

const nickNameOptions: TOptions = {
    props: {
        headClassName: "",
        id: "display_name",
        label: "Имя в чате",
        name: "display_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

const passwordOptions: TOptions = {
    props: {
        headClassName: "",
        id: "password",
        label: "Пароль",
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
        headClassName: "",
        id: "againPassword",
        label: "Повторите пароль",
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
        headClassName: "",
        id: "newPassword",
        label: "Новый пароль",
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
        headClassName: "",
        id: "phone",
        label: "Телефон",
        name: "phone",
        rules: [rules.required, rules.phone, rules.phoneMinLength, rules.phoneMaxLength],
        type: "tel",
        value: "",
    },
}

const searchOptions: TOptions = {
    props: {
        headClassName: "",
        id: "search",
        label: "Логин",
        name: "search",
        rules: [],
        type: "text",
        value: "",
    },
}

const secondNameOptions: TOptions = {
    props: {
        headClassName: "",
        id: "second_name",
        label: "Фамилия пользователя",
        name: "second_name",
        rules: [rules.required, rules.firstAndSecondName],
        type: "text",
        value: "",
    },
}

export {
    factory,
    isValid,
    reset,
    values,
    avatarOptions,
    chatTitleOptions,
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
