import Compiler from "../../plugins/template-engine/Compiler"
import { pageSettingsComp } from "../../components"
import formComp from "./components/form"

export default Compiler.compile(pageSettingsComp, {
    $data: {
        anchor: {
            ref: "../settings/index.html",
        },
        userDnaCard: {
            classNames: { foot: "d_none", name: "d_none" },
        },
    },
    $slots: {
        userDnaCard: {
            body: formComp,
        },
    },
})
