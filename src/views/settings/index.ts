import {UiLayout} from "~/src/layouts"
import {BackButton, UserBioCard} from "../../components"
import {Details, NavMenu} from "~/src/views/settings/components"

class SettingsPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: new BackButton("../home/index.html"),
                main: new UserBioCard({
                    components: {
                        body: new Details("list"),
                        foot: new NavMenu("list"),
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

export default SettingsPage
