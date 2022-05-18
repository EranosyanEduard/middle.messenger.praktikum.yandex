import {View} from "~/src/core/view"
import {TContext, TOptions} from "./models"
import {TPredicate, validator} from "~/src/utils"

function input(opts: TOptions) {
    /**
     * @description Проверить значение поля ввода на соответствие условиям,
     * определенным в списке rules. В случае, если правила отсутствуют, то
     * функция имеет "пустое" тело.
     */
    let runValidation: (context: TContext, value: string) => void

    const validationRules: [TPredicate, string][] = opts.props.rules.map((rule) => [
        validator[rule.type](rule.arg),
        rule.getError(`${rule.arg}`),
    ])

    if (validationRules.length > 0) {
        runValidation = (context, value) => {
            for (const [validate, error] of validationRules) {
                if (!validate(value)) {
                    context.props.error = error
                    context.props.inputClassName = "field__input_error"
                    return
                }
            }
            context.props.error = ""
            context.props.inputClassName = ""
        }
    } else {
        runValidation = () => {}
    }

    return View.new({
        name: "Input",
        template: `
            <div class="field">
                <div :class="headClassName" class="field__head">
                    <label :for="id" :text="label" class="field__label"></label>
                </div>
                <div class="field__body">
                    <input
                        :class="inputClassName"
                        :id="id"
                        :name="name"
                        :type="type"
                        :value="value"
                        @blur="onBlur"
                        @focus="onFocus"
                        class="field__input">
                </div>
                <div class="field__foot">
                    <span :text="error" class="field__label field__label_type_error"></span>
                </div>
            </div>
        `,
        meths: {
            onBlur(event: Event) {
                const {value} = event.target as HTMLInputElement
                runValidation(this, value)
                this.props.value = value
            },
            onFocus(event: Event) {
                const {value} = event.target as HTMLInputElement
                runValidation(this, value)
                this.props.value = value
            },
        },
        props: {
            ...opts.props,
            error: "",
            inputClassName: "",
        },
    })
}

export default input
