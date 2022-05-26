import {View} from "~/src/core/view"
import redirectButton from "../redirect-button"
import {TOptions} from "./models"

function Error(opts: TOptions) {
    return View.new({
        name: "Error",
        template: `
            <div class="error" :class="className">
                <span class="error__code" :text="error.code"></span>
                <span class="error__msg" :text="error.text"></span>
                <RedirectButton></RedirectButton>
            </div>
        `,
        views: {
            redirectButton: redirectButton({
                routeName: undefined,
                routerMethod: "back",
                text: "Назад",
            }),
        },
        ...opts,
    })
}

export default Error
