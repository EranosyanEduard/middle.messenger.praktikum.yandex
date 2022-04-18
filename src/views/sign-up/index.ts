import {AppLayout} from "~/src/layouts"
import {Button, Form, RedirectButton} from "~/src/components"
import {ERouteNames} from "~/src/router"
import {
    emailOptions,
    factory,
    firstNameOptions,
    getValues,
    isValid,
    loginOptions,
    passwordAgainOptions,
    passwordOptions,
    secondNameOptions,
} from "~/src/components/input/utils"

const fieldset = factory([
    emailOptions,
    loginOptions,
    firstNameOptions,
    secondNameOptions,
    passwordOptions,
    passwordAgainOptions,
])

class SignUpPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Form({
                    components: {
                        body: fieldset,
                        redirectRef: new RedirectButton({
                            routeName: ERouteNames.SignIn,
                            routerMethod: "go",
                            text: "Уже зарегистрированы?",
                        }),
                        submitBtn: new Button({
                            emits: {
                                onClick: () => {},
                            },
                            props: {
                                bemBlock: "button",
                                className: "",
                                text: "Зарегистрироваться",
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
                        formClassName: "box-shadow m_xy_auto",
                        headClassName: "",
                        legend: "Зарегистрироваться в приложение",
                    },
                }),
            },
        })
    }
}

export default SignUpPage
