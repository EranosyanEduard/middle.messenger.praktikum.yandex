import {TemplateFactory} from "../../../../core/template-engine"
import SOURCE from "./source"

export default TemplateFactory.getCons(SOURCE, {
    data: {
        refs: [
            {
                className: "",
                ref: "../set-user-bio/index.html",
                text: "Изменить данные",
            },

            {
                className: "",
                ref: "../set-user-password/index.html",
                text: "Изменить пароль",
            },

            {
                className: "anchor_color_error",
                ref: "../sign-in/index.html",
                text: "Выйти",
            },
        ],
    },
    options: {bemBlock: "list"},
})
