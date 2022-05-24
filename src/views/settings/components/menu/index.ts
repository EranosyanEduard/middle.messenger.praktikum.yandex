import {View} from "~/src/core/view"
import {redirectButton} from "~/src/components"
import controller from "~/src/controllers"
import store from "~/src/stores"

function navMenu() {
    const EXIT_BTN_CLASS_NAME = "button_text-color_error"

    return View.new({
        name: "NavMenu",
        template: `
                <ul @click="onClick" class="list">
                    <li class="list__item"><Ref1></Ref1></li>
                    <li class="list__item"><Ref2></Ref2></li>
                    <li class="list__item"><Ref3></Ref3></li>
                </ul>
            `,
        meths: {
            async onClick(evt: Event) {
                if ((evt.target as HTMLElement).classList.contains(EXIT_BTN_CLASS_NAME)) {
                    await controller.auth.signOut()
                }
            },
        },
        views: {
            ref1: redirectButton({
                routeName: "userBioSettings",
                routerMethod: "go",
                text: "Изменить данные",
            }),
            ref2: redirectButton({
                routeName: "userPasswordSettings",
                routerMethod: "go",
                text: "Изменить пароль",
            }),
            ref3: redirectButton(
                {
                    className: `button_text ${EXIT_BTN_CLASS_NAME}`,
                    routeName: "signIn",
                    routerMethod: "go",
                    text: "Выйти",
                },
                () => store.auth.state.set("isAuth", false),
            ),
        },
    })
}

export default navMenu
