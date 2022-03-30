import uiLayoutCons from "../../layouts/ui"
import {backButtonCons, formCons, userBioCardCons} from "../../components"
import {SET_USER_BIO_FORM_CONTEXT} from "../../components/form/utils"

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
                    data: {ref: "../settings.html"},
                })
                .compile(),
            main: userBioCardCons.instance
                .addContext({
                    slots: {
                        body: formCons.instance.addContext(SET_USER_BIO_FORM_CONTEXT).compile(),
                        foot: "",
                    },
                })
                .compile(),
        },
    })
    .compile()
