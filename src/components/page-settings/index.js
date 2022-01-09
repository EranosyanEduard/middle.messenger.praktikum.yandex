import Compiler from "../../plugins/template-engine/Compiler"
import uiLayout from "../../layouts/ui"
import { backBtnComp, userDnaCardComp } from "./components"

const pageAreaClassName = "ui__area_page_settings"

export default Compiler.compile(uiLayout, {
    $data: {
        userDnaCard: {
            name: "Имя пользователя",
        },
        ui: {
            classNames: {
                aside: `${pageAreaClassName} box-shadow`,
                container: "app",
                main: pageAreaClassName,
            },
        },
    },
    $slots: {
        ui: {
            aside: backBtnComp,
            main: userDnaCardComp,
        },
    },
})
