import {Component} from "~/src/core/component"
import {EChars} from "~/src/models/common"
import {TPredicate, validator} from "~/src/utils"
import {TEmitterKey, TOptions, TProps} from "./models"

class Input extends Component<TProps, never, TEmitterKey> {
    constructor(options: TOptions) {
        /**
         * @description
         * Проверить значение поля ввода на соответствие условиям, определенным
         * в списке rules. В случае, если правила отсутствуют, то функция имеет
         * "пустое" тело.
         */
        const runValidation = (() => {
            const {rules} = options.props
            if (rules.length > 0) {
                const validationRules: Array<[TPredicate, string]> = rules.map((rule) => [
                    validator[rule.type](rule.arg),
                    rule.getError(`${rule.arg}`),
                ])
                return (val: string) => {
                    for (const [validate, error] of validationRules) {
                        if (!validate(val)) {
                            this.props = {
                                error,
                                inputClassName: "&__input_error",
                            }
                            return
                        }
                    }
                    this.props = {
                        error: EChars.Empty,
                        inputClassName: EChars.Empty,
                    }
                }
            }
            return () => {}
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
                            class="&__input {{inputClassName}}"
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
                    this.props = {value}
                },
            },
            props: options.props,
        })
    }
}

export default Input
