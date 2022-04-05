import {Component, TComponentOptions} from "~/src/core/component"
import {TComponentKey, TProps} from "./models"

class UiLayout extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps, TComponentKey>, "components" | "props">) {
        super({
            template: `
                <main class="& {{boxClassName}}">
                    <section class="&__area &__area_id_aside {{asideClassName}}">
                        <aside-component />
                    </section>
                    <section class="&__area {{mainClassName}}">
                        <main-component />
                    </section>
                </main>
            `,
            props: options.props,
            components: options.components,
        })
    }
}

export default UiLayout
