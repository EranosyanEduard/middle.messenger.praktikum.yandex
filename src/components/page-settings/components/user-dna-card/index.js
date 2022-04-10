import Compiler from "../../../../plugins/template-engine/Compiler"
import TEMPLATE from "./template"
import avatarComp from "../../../avatar"

export default Compiler.compile(TEMPLATE, {
    $data: {
        avatar: {
            classNames: {
                container: "avatar_size_lg",
                img: "avatar__img_empty",
            },
            ref: "#",
        },
        userDnaCard: { classNames: { card: "m_all_auto" } },
    },
    $slots: {
        userDnaCard: {
            avatar: avatarComp,
        },
    },
})
