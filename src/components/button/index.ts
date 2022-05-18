import {View} from "~/src/core/view"
import {TOptions} from "./models"

function button(opts: TOptions) {
    return View.new({
        name: "Button",
        template: `
            <button
                :class="className"
                :text="text"
                :type="type"
                @click="onClick"
                class="button">
            </button>
        `,
        ...opts,
    })
}

export default button
