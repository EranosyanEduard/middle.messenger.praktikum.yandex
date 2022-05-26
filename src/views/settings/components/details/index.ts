import {View} from "~/src/core/view"
import {stub} from "~/src/components"
import store from "~/src/stores"
import item from "./item"
import {itemList} from "./utils"

function details() {
    return View.new({
        name: "Details",
        template: '<ul #aria-label="items" class="list"></ul>',
        slots: {
            items: stub,
        },
        async didMount() {
            const user = store.user.state.get("user")
            this.slots.items = itemList.map(({id, term}) => {
                const props = {
                    def: user[id],
                    term,
                }
                return item({props})
            })
        },
    })
}

export default details
