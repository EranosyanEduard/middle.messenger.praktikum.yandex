import {Component, TComponentOptions} from "~/src/core/component"
import {TProps} from "./models"

class Item extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps>, "props">) {
        super({
            template: `
                <li class="&__item &__item_jc_space-between details">
                    <span class="details__term">{{term}}</span>
                    <span class="details__def">{{def}}</span>
                </li>
            `,
            props: options.props,
        })
    }
}

export default Item
