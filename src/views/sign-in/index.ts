import {AppLayout} from "~/src/layouts"
import {Anchor, Button, Form} from "~/src/components"
import {factory, loginOptions, passwordOptions} from "~/src/components/input/utils"

const fieldset = factory([loginOptions, passwordOptions])

class SignInPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Form({
                    components: {
                        body: fieldset,
                        redirectRef: new Anchor({
                            props: {
                                bemBlock: "anchor",
                                className: "",
                                ref: "../sign-up/index.html",
                                text: "Нет аккаунта?",
                            },
                        }),
                        submitBtn: new Button({
                            emits: {
                                onClick() {},
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
                            fieldset.forEach((it) => console.log(it.getProp("value", () => "default value")))
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
