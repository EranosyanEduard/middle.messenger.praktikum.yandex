import {Component} from "~/src/core/component"
import DetailsItem from "./item/DetailsItem"
import {TProps} from "./item/models"

class Details extends Component<Pick<TProps, "bemBlock">> {
    constructor(bemBlock: string) {
        super({
            template: '<ul class="&"><items-component /></ul>',
            components: {
                items: [
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
                ].map((it) => new DetailsItem({props: {bemBlock, ...it}})),
            },
            props: {bemBlock},
        })
    }
}

export default Details
