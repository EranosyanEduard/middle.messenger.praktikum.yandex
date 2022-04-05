import {Component} from "~/src/core/component"
import {TOptions, TProps} from "./models"

class Form extends Component<TProps> {
    constructor(options: TOptions) {
        super({
            template: `
                <form class="& {{formClassName}}" data-on="submit:onSubmit">
                    <fieldset class="&__fieldset">
                        <div class="&__content {{contentClassName}}">
                            <div class="&__head {{headClassName}}">
                                <legend class="&__legend">{{legend}}</legend>
                            </div>
                            <div class="&__body"><body-component /></div>
                            <div class="&__foot">
                                <submit-btn-component />
                                <redirect-ref-component />
                            </div>
                        </div>
                    </fieldset>
                </form>
            `,
            components: options.components,
            emits: options.emits,
            props: options.props,
        })
    }
}

export default Form
