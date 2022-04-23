import {Component} from "~/src/core/component"
import {RedirectButton} from "~/src/components"
import controllers from "~/src/controllers"
import {TComponentKey, TEmitterKey, TProps} from "./models"

class NavMenu extends Component<TProps, TComponentKey, TEmitterKey> {
    constructor() {
        const exitBtnClassName = "button_text-color_error"
        super({
            template: `
                <ul class="&" data-on="click:onClick">
                    <li class="&__item"><ref1-component /></li>
                    <li class="&__item"><ref2-component /></li>
                    <li class="&__item"><ref3-component /></li>
                </ul>
            `,
            components: {
                ref1: new RedirectButton({
                    routeName: "userBioSettings",
                    routerMethod: "go",
                    text: "Изменить данные",
                }),
                ref2: new RedirectButton({
                    routeName: "userPasswordSettings",
                    routerMethod: "go",
                    text: "Изменить пароль",
                }),
                ref3: new RedirectButton({
                    className: exitBtnClassName,
                    routeName: "signIn",
                    routerMethod: "go",
                    text: "Выйти",
                }),
            },
            emits: {
                async onClick(evt) {
                    if ((evt.target as HTMLElement).classList.contains(exitBtnClassName)) {
                        await controllers.auth.signOut()
                    }
                },
            },
            props: {bemBlock: "list"},
        })
    }
}

export default NavMenu
