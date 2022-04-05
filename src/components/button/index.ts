import {Component, TComponentOptions} from "~/src/core/component"
import {TEmitterKey, TProps} from "./models"

class Button extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps, never, TEmitterKey>, "emits" | "props">) {
        super({
            template: `
                <button type="{{type}}" class="& {{className}} bg_color_primary-base" data-on="click:onClick">
                    {{text}}
                </button>
            `,
            emits: options.emits,
            props: options.props,
        })
    }
}

export default Button
