import {UiLayout} from "../../layouts"
import {BackButton, Form, UserBioCard} from "../../components"
import {Button, Stub} from "~/src/components"
import {
    emailComp,
    firstNameComp,
    loginComp,
    nickNameComp,
    phoneComp,
    secondNameComp,
} from "~/src/components/input/utils"

const fieldset = [emailComp, loginComp, firstNameComp, secondNameComp, nickNameComp, phoneComp]

class SetUserBioPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: new BackButton("../settings.html"),
                main: new UserBioCard({
                    components: {
                        body: new Form({
                            components: {
                                body: fieldset,
                                redirectRef: new Stub(),
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
                                    fieldset.forEach((it) => console.log(it.getProp("value", () => "default value")))
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
                        foot: new Stub(),
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

export default SetUserBioPage
