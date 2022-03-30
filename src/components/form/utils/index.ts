import Template from "../../../core/template-engine/src/Template"
import {TContext} from "../../../core/template-engine/models"
import {getFieldListByKeys} from "../../input/utils"
import {EFieldKeys} from "../../../models/field-comp"
import {anchorCons, buttonCons, inputCons} from "../../index"

const SET_USER_BIO_FORM_CONTEXT: TContext<Template> = {
    data: {
        classes: {
            content: "&__content_without_head",
            form: "&_bg_none",
            head: "d_none",
        },
        inputs: getFieldListByKeys([
            EFieldKeys.Email,
            EFieldKeys.Login,
            EFieldKeys.FirstName,
            EFieldKeys.SecondName,
            EFieldKeys.NickName,
            EFieldKeys.Phone,
        ]),
    },
    components: {
        field: inputCons.instance,
        redirectRef: anchorCons.instance.addContext({
            data: {
                className: "d_none",
            },
        }),
        submitBtn: buttonCons.instance.addContext({
            data: {
                className: "",
                text: "Сохранить",
                type: "submit",
            },
        }),
    },
}

const SET_USER_PASSWORD_FORM_CONTEXT: TContext<Template> = {
    data: {
        classes: {
            content: "&__content_without_head",
            form: "&_bg_none",
            head: "d_none",
        },
        inputs: getFieldListByKeys([
            EFieldKeys.Password,
            EFieldKeys.NewPasswordFirst,
            EFieldKeys.NewPasswordSecond,
        ]),
    },
    components: {
        field: inputCons.instance,
        redirectRef: anchorCons.instance.addContext({
            data: {
                className: "d_none",
            },
        }),
        submitBtn: buttonCons.instance.addContext({
            data: {
                className: "",
                text: "Сохранить",
                type: "submit",
            },
        }),
    },
}

const SIGN_IN_FORM_CONTEXT: TContext<Template> = {
    data: {
        classes: {form: "form_action_sign-in box-shadow m_xy_auto"},
        inputs: getFieldListByKeys([EFieldKeys.Login, EFieldKeys.Password]),
        legend: "Войти в приложение",
    },
    components: {
        field: inputCons.instance,
        redirectRef: anchorCons.instance.addContext({
            data: {
                className: "",
                ref: "../sign-up/index.html",
                text: "Нет аккаунта?",
            },
        }),
        submitBtn: buttonCons.instance.addContext({
            data: {
                className: "",
                text: "Войти",
                type: "submit",
            },
        }),
    },
}

const SIGN_UP_FORM_CONTEXT: TContext<Template> = {
    data: {
        classes: {form: "box-shadow m_xy_auto"},
        inputs: getFieldListByKeys([
            EFieldKeys.Email,
            EFieldKeys.Login,
            EFieldKeys.FirstName,
            EFieldKeys.SecondName,
            EFieldKeys.Password,
            EFieldKeys.NewPasswordFirst,
        ]),
        legend: "Зарегистрироваться в приложении",
    },
    components: {
        field: inputCons.instance,
        redirectRef: anchorCons.instance.addContext({
            data: {
                className: "",
                ref: "../sign-in/index.html",
                text: "Уже зарегистрированы?",
            },
        }),
        submitBtn: buttonCons.instance.addContext({
            data: {
                className: "",
                text: "Зарегистрироваться",
                type: "submit",
            },
        }),
    },
}

export {
    SET_USER_BIO_FORM_CONTEXT,
    SET_USER_PASSWORD_FORM_CONTEXT,
    SIGN_IN_FORM_CONTEXT,
    SIGN_UP_FORM_CONTEXT,
}
