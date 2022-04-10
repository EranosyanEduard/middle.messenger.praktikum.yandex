import Compiler from "../../plugins/template-engine/Compiler"
import { pageSettingsComp } from "../../components"
import { menuComp, userDnaItemsComp } from "./components"

export default Compiler.compile(pageSettingsComp, {
    $data: {
        anchor: {
            ref: "../index.html",
        },
        userDnaCard: {
            classNames: { name: "" },
        },
    },
    $slots: {
        userDnaCard: {
            body: userDnaItemsComp,
            foot: menuComp,
        },
    },
})
