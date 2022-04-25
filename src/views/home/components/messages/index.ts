import {Component, TComponentOpts} from "~/src/core/component"
import {TProps} from "./models"

class Messages extends Component<TProps> {
    constructor(options: Pick<TComponentOpts<TProps>, "props">) {
        super({
            template: '<div class="& {{messagesClassName}}"></div>',
            props: options.props,
        })
    }
}

export default Messages
