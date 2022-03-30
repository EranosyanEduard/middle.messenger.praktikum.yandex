import {TemplateFactory} from "../../../../core/template-engine"
import SOURCE from "./source"

export default TemplateFactory.getCons(SOURCE, {
    data: {
        details: [
            {
                term: "Почта",
                def: "user-email@here.ok",
            },
            {
                term: "Логин",
                def: "Мой логин",
            },
            {
                term: "Имя",
                def: "Мое имя",
            },
            {
                term: "Фамилия",
                def: "Моя фамилия",
            },
            {
                term: "Имя в чате",
                def: "Мое имя в чате",
            },
            {
                term: "Телефон",
                def: "+7(123)456-78-90",
            },
        ],
    },
    options: {bemBlock: "list"},
})
