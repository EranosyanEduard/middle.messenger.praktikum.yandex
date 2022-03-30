import {TemplateFactory} from "../../core/template-engine"
import SOURCE from "./source"
import avatarCons from "../avatar"

export default TemplateFactory.getCons(SOURCE, {
    data: {
        name: "Имя пользователя",
        classes: {card: "m_xy_auto"},
    },
    components: {
        avatar: avatarCons.instance.addContext({
            data: {
                classes: {
                    avatar: "&_size_lg",
                    img: "&__img_empty",
                },
            },
        }),
    },
    options: {bemBlock: "user-bio-card"},
})
