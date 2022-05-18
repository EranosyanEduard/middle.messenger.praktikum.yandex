import {View} from "~/src/core/view"
import {stub} from "~/src/components"

function users() {
    return View.new({
        name: "Users",
        template: '<ul #aria-label="users" class="list users"></ul>',
        slots: {
            users: stub,
        },
    })
}

export default users
