import {Component, TComponentOptions} from "~/src/core/component"
import {TProps} from "./models"

class Messages extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps>, "props">) {
        super({
            template: '<div class="& {{messagesClassName}}"></div>',
            props: options.props,
        })
    }
}

export default Messages
