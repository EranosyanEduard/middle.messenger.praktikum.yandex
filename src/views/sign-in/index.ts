import {AppLayout} from "~/src/layouts"
import {Button, Form, RedirectButton} from "~/src/components"
import {ERouteNames} from "~/src/router"
import {
    factory,
    getValues,
    isValid,
    loginOptions,
    passwordOptions,
} from "~/src/components/input/utils"

const fieldset = factory([loginOptions, passwordOptions])

class SignInPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Form({
                    components: {
                        body: fieldset,
                        redirectRef: new RedirectButton({
                            routeName: ERouteNames.SignUp,
                            routerMethod: "go",
                            text: "Нет аккаунта?",
                        }),
                        submitBtn: new Button({
                            emits: {
                                onClick: () => {},
                            },
                            props: {
                                bemBlock: "button",
                                className: "",
                                text: "Войти",
                                type: "submit",
                            },
                        }),
                    },
                    emits: {
                        onSubmit(event) {
                            event.preventDefault()
                            console.log(getValues(fieldset))
                            console.log(isValid(fieldset))
                        },
                    },
                    props: {
                        bemBlock: "form",
                        contentClassName: "",
                        formClassName: "form_action_sign-in box-shadow m_xy_auto",
                        headClassName: "",
                        legend: "Войти в приложение",
                    },
                }),
            },
        })
    }
}

export default SignInPage
