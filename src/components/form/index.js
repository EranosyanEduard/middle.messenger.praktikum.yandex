import Compiler from "../../plugins/template-engine/Compiler"
import TEMPLATE from "./template"
import anchorComp from "../anchor"
import buttonComp from "../button"
import { ArrMeths } from "../../utils"

export default Compiler.compile(TEMPLATE, {
    $data: {
        button: {
            className: "",
            type: "submit",
        },
    },
    $slots: {
        form: {
            footEnd: ArrMeths.joinToString([buttonComp, anchorComp]),
        },
    },
})
