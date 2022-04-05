import {AppLayout} from "~/src/layouts"
import {Anchor, Button, Form} from "../../components"
import {
    emailComp,
    firstNameComp,
    loginComp,
    passwordAgainComp,
    passwordComp,
    secondNameComp,
} from "~/src/components/input/utils"

const fieldset = [emailComp, loginComp, firstNameComp, secondNameComp, passwordComp, passwordAgainComp]

class SignUpPage extends AppLayout {
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
                                ref: "../sign-in/index.html",
                                text: "Уже зарегистрированы?",
                            },
                        }),
                        submitBtn: new Button({
                            emits: {
                                onClick() {},
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
                            fieldset.forEach((it) => console.log(it.getProp("value", () => "default value")))
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
