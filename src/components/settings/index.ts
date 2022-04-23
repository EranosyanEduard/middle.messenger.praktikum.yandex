import {Component, TComponentOptions} from "~/src/core/component"
import Avatar from "../avatar"
import {TComponentKey, TProps} from "./models"

class Settings extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps, TComponentKey>, "components" | "props">) {
        super({
            template: `
                <section class="& {{cardClassName}}">
                    <header class="&__head">
                        <avatar-component />
                        <h2 class="&__name {{nameClassName}}">{{name}}</h2>
                    </header>
                    <main class="&__body"><body-component /></main>
                    <footer class="&__foot {{footClassName}}"><foot-component /></footer>
                </section>
            `,
            props: options.props,
            components: {
                ...options.components,
                avatar: new Avatar({
                    props: {
                        avatarClassName: "&_size_lg",
                        bemBlock: "avatar",
                        imgClassName: "&__img_empty",
                    },
                }),
            },
        })
    }
}

export default Settings
