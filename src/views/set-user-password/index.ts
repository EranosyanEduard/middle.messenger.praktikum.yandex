import {UiLayout} from "../../layouts"
import {BackButton, Form, UserBioCard} from "../../components"
import {Button, Stub} from "~/src/components"
import {
    factory,
    getValues,
    isValid,
    passwordAgainOptions,
    passwordNewOptions,
    passwordOptions,
} from "~/src/components/input/utils"

const fieldset = factory([passwordOptions, passwordNewOptions, passwordAgainOptions])
const stub = new Stub()

class SetUserPasswordPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: new BackButton("../settings/index.html"),
                main: new UserBioCard({
                    components: {
                        body: new Form({
                            components: {
                                body: fieldset,
                                redirectRef: stub,
                                submitBtn: new Button({
                                    emits: {
                                        onClick() {},
                                    },
                                    props: {
                                        bemBlock: "button",
                                        className: "",
                                        text: "Сохранить",
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
                                contentClassName: "&__content_without_head",
                                formClassName: "&_bg_none",
                                headClassName: "d_none",
                                legend: "",
                            },
                        }),
                        foot: stub,
                    },
                    props: {
                        bemBlock: "user-bio-card",
                        cardClassName: "m_xy_auto",
                        footClassName: "",
                        name: "Имя пользователя",
                        nameClassName: "",
                    },
                }),
            },
            props: {
                asideClassName: "&__area_page_settings box-shadow",
                bemBlock: "ui",
                boxClassName: "app",
                mainClassName: "&__area_page_settings",
            },
        })
    }
}

export default SetUserPasswordPage
