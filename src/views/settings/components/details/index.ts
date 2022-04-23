import {Component} from "~/src/core/component"
import controller from "~/src/controllers"
import {bemBlock, items} from "./utils"
import {TComponentKey, TProps} from "./models"

class Details extends Component<TProps, TComponentKey> {
    constructor() {
        super({
            template: '<ul class="&"><items-component /></ul>',
            components: {
                items,
            },
            props: {
                bemBlock,
            },
        })
    }

    async didMount() {
        await controller.auth.getUser()
    }
}

export default Details
