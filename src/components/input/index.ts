import {Component} from "~/src/core/component"
import {TEmitterKey, TOptions, TProps} from "./models"

class Input extends Component<TProps, never, TEmitterKey> {
    constructor(options: TOptions) {
        super({
            template: `
                <div class="& {{fieldWrapperClassName}}">
                    <div class="&__head {{headClassName}}">
                        <label for="{{id}}" class="&__label {{labelClassName}}">{{label}}</label>
                    </div>
                    <div class="&__body">
                        <input
                            type="{{type}}"
                            name="{{name}}"
                            id="{{id}}"
                            class="&__input"
                            value="{{value}}"
                            data-on="input:onInput blur:onBlur">
                    </div>
                    <div class="&__foot">
                        <span class="&__label &__label_type_error">{{error}}</span>
                    </div>
                </div>
            `,
            emits: options.emits,
            props: options.props,
        })
    }
}

export default Input
