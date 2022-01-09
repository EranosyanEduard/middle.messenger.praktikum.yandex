import Compiler from "../../plugins/template-engine/Compiler"
import TEMPLATE from "./template"
import anchorComp from "../anchor"

export default Compiler.compile(TEMPLATE, {
    $data: {
        anchor: {
            className: "",
            ref: "../index.html",
            text: "Назад",
        },
    },
    $slots: { error: { end: anchorComp } },
})
