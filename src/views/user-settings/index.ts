import {UiLayout} from "../../layouts"
import {Settings, Stub} from "~/src/components"
import {form, redirectBtn} from "./instances"

class UserSettingsPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: redirectBtn,
                main: new Settings({
                    components: {
                        body: form,
                        foot: new Stub(),
                    },
                    props: {
                        bemBlock: "user-bio-card",
                        cardClassName: "m_xy_auto",
                        footClassName: "",
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

export default UserSettingsPage
