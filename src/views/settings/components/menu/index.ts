import {Component} from "~/src/core/component"
import NavMenuItem from "./item/NavMenuItem"
import {TProps} from "./item/models"

class NavMenu extends Component<TProps> {
    constructor(bemBlock: string) {
        super({
            template: '<ul class="&"><items-component /></ul>',
            components: {
                items: [
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
                ].map((it) => new NavMenuItem({props: {bemBlock, ...it}})),
            },
            props: {bemBlock},
        })
    }
}

export default NavMenu
