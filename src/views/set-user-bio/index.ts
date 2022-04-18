import {UiLayout} from "../../layouts"
import {Form, UserBioCard} from "../../components"
import {Button, RedirectButton, Stub} from "~/src/components"
import {
    emailOptions,
    factory,
    firstNameOptions,
    getValues,
    isValid,
    loginOptions,
    nickNameOptions,
    phoneOptions,
    secondNameOptions,
} from "~/src/components/input/utils"

const fieldset = factory([
    emailOptions,
    loginOptions,
    firstNameOptions,
    secondNameOptions,
    nickNameOptions,
    phoneOptions,
])
const stub = new Stub()

class SetUserBioPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: new RedirectButton({
                    routeName: undefined,
                    routerMethod: "back",
                    text: "",
                }),
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

export default SetUserBioPage
