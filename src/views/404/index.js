import Compiler from "../../plugins/template-engine/Compiler"
import appLayout from "../../layouts/app"
import errorComp from "./components/error"

export default Compiler.compile(appLayout, {
    $data: {
        app: {
            className: "d_flex",
        },
    },
    $slots: {
        app: {
            body: errorComp,
        },
    },
})
