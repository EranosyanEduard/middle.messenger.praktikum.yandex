import {UiLayout} from "~/src/layouts"
import {Settings} from "../../components"
import {Details, NavMenu} from "~/src/views/settings/components"
import {RedirectButton} from "~/src/components"

class SettingsPage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: new RedirectButton({
                    routeName: undefined,
                    routerMethod: "back",
                    text: "",
                }),
                main: new Settings({
                    components: {
                        body: new Details(),
                        foot: new NavMenu(),
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
