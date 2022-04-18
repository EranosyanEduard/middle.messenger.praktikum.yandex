import {Component} from "~/src/core/component"
import {RedirectButton} from "~/src/components"
import {ERouteNames} from "~/src/router"
import {TProps} from "./models"

class NavMenu extends Component<TProps> {
    constructor(bemBlock: string) {
        super({
            template: `
                <ul class="&">
                    <li class="&__item"><ref1-component /></li>
                    <li class="&__item"><ref2-component /></li>
                    <li class="&__item"><ref3-component /></li>
                </ul>
            `,
            components: {
                ref1: new RedirectButton({
                    routeName: ERouteNames.SetUserBio,
                    routerMethod: "go",
                    text: "Изменить данные",
                }),
                ref2: new RedirectButton({
                    routeName: ERouteNames.SetUserPassword,
                    routerMethod: "go",
                    text: "Изменить пароль",
                }),
                ref3: new RedirectButton({
                    routeName: ERouteNames.SignIn,
                    routerMethod: "go",
                    text: "Выйти",
                }),
            },
            props: {bemBlock},
        })
    }
}

export default NavMenu
