import {uiLayout} from "../../layouts"
import {stub} from "~/src/components"
import {redirectButton, settings} from "./instances"

function userSettingsView() {
    return uiLayout({
        props: {
            asideClassName: "ui__area_page_settings box-shadow",
            mainClassName: "ui__area_page_settings",
        },
        views: {
            asideSection: redirectButton,
            mainSection: settings,
            optionalSection: stub,
        },
    })
}

export default userSettingsView
