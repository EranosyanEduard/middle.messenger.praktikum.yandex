import Compiler from "../../../../plugins/template-engine/Compiler"
import anchorComp from "../../../anchor"
import { ArrMeths } from "../../../../utils"

export default Compiler.compile(anchorComp, {
    $data: {
        anchor: {
            className: ArrMeths.joinToString([
                "anchor_icon",
                "anchor_icon_arrow-back",
                "anchor_icon_xl",
                "m_all_auto",
            ]),
            text: "",
        },
    },
})
