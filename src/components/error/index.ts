import {Component, TComponentOptions} from "~/src/core/component"
import Anchor from "../anchor"
import {TProps} from "./models"

class Error extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps>, "props">) {
        super({
            template: `
                <div class="& {{className}}">
                    <span class="&__code">{{code}}</span>
                    <span class="&__msg">{{msg}}</span>
                    <anchor-component />
                </div>
            `,
            props: options.props,
            components: {
                anchor: new Anchor({
                    props: {
                        bemBlock: "anchor",
                        className: "",
                        ref: "../index.html",
                        text: "Назад",
                    },
                }),
            },
        })
    }
}

export default Error
