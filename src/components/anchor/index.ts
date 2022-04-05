import {Component, TComponentOptions} from "~/src/core/component"
import {TProps} from "./models"

class Anchor extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps>, "props">) {
        super({
            template: '<a href="{{ref}}" class="& {{className}}">{{text}}</a>',
            props: options.props,
        })
    }
}

export default Anchor
