import uiLayoutCons from "../../layouts/ui"
import {anchorCons, backButtonCons, userBioCardCons} from "../../components"
import {cardCons, menuCons} from "./components"

const UI_AREA_MODIFIER_CLASS = "&__area_page_settings"

export default uiLayoutCons.instance
    .addContext({
        data: {
            classes: {
                aside: `${UI_AREA_MODIFIER_CLASS} box-shadow`,
                box: "app",
                main: UI_AREA_MODIFIER_CLASS,
            },
        },
        slots: {
            aside: backButtonCons.instance
                .addContext({
                    data: {ref: "../index.html"},
                })
                .compile(),
            main: userBioCardCons.instance
                .addContext({
                    slots: {
                        body: cardCons.instance.compile(),
                        foot: menuCons.instance
                            .addContext({
                                components: {
                                    anchor: anchorCons.instance,
                                },
                            })
                            .compile(),
                    },
                })
                .compile(),
        },
    })
    .compile()
