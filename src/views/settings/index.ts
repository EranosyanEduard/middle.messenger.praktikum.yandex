import {uiLayout} from "~/src/layouts"
import {stub} from "~/src/components"
import {redirectButton, settings} from "./instances"

function settingsView() {
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

export default settingsView
