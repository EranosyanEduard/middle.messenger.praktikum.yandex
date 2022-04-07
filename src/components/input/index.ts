import {Component} from "~/src/core/component"
import {TEmitterKey, TOptions, TProps} from "./models"
import {TPredicate, validator} from "~/src/utils"

class Input extends Component<TProps, never, TEmitterKey> {
    constructor(options: TOptions) {
        const runValidation = (() => {
            const validationRules: Array<[TPredicate, string]> = options.props.rules.map((rule) => [
                validator[rule.type](rule.arg),
                rule.getError(`${rule.arg}`),
            ])
            return (val: string) => {
                for (const [validate, error] of validationRules) {
                    const message = !validate(val) ? error : ""
                    this.props = {error: message}
                    if (message.length > 0) {
                        return
                    }
                }
            }
        })()
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
                            data-on="blur:onBlur focus:onFocus">
                    </div>
                    <div class="&__foot">
                        <span class="&__label &__label_type_error">{{error}}</span>
                    </div>
                </div>
            `,
            emits: {
                onBlur(event) {
                    const {value} = event.target as HTMLInputElement
                    runValidation(value)
                    this.props = {value}
                },
                onFocus(event) {
                    const {value} = event.target as HTMLInputElement
                    runValidation(value)
                },
            },
            props: options.props,
        })
    }
}

export default Input
