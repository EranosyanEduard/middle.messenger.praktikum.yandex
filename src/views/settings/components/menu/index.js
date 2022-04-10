import Compiler from "../../../../plugins/template-engine/Compiler"
import { anchorComp } from "../../../../components"
import listHelpers from "../../../../components/list/utils"

const listProto = listHelpers.methods.createComp(anchorComp, "anchor")

const menuContext = {
    $data: {
        items: [
            {
                className: "",
                ref: "../edit-user-dna/index.html",
                text: "Изменить данные",
            },
            {
                className: "",
                ref: "../edit-user-password/index.html",
                text: "Изменить пароль",
            },
            {
                className: "anchor_color_error",
                ref: "../sign-in/index.html",
                text: "Выйти",
            },
        ],
    },
}

export default Compiler.compile(listProto, menuContext)
