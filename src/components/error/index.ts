import {Component, TComponentOptions} from "~/src/core/component"
import {RedirectButton} from "~/src/components"
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
                anchor: new RedirectButton({
                    routeName: undefined,
                    routerMethod: "back",
                    text: "Назад",
                }),
            },
        })
    }
}

export default Error
