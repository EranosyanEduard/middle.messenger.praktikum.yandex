import {Component, TComponentOptions} from "~/src/core/component"
import {Anchor} from "~/src/components"
import {TProps as TAnchorProps} from "~/src/components/anchor/models"
import {TProps} from "./models"

class NavMenuItem extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TAnchorProps>, "props">) {
        const {bemBlock, ...anchorProps} = options.props
        super({
            template: '<li class="&__item"><anchor-component /></li>',
            components: {anchor: new Anchor({props: {bemBlock: "anchor", ...anchorProps}})},
            props: {bemBlock},
        })
    }
}

export default NavMenuItem
