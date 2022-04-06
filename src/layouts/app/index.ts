import {Component, TComponentOptions} from "~/src/core/component"

class AppLayout extends Component<never> {
    constructor(options: Pick<TComponentOptions<never, "body">, "components">) {
        super({
            template: '<div class="app d_flex"><body-component /></div>',
            components: options.components,
        })
    }
}

export default AppLayout