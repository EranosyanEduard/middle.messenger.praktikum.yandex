import {Component, TComponentOpts} from "~/src/core/component"
import Avatar from "../avatar"
import {TComponentKey, TProps} from "./models"
import store, {TUserState, useState} from "~/src/stores"

@useState<TUserState>(store.user, ["user"])
class Settings extends Component<TProps> {
    constructor(
        options: Pick<TComponentOpts<Omit<TProps, "user">, TComponentKey>, "components" | "props">,
    ) {
        super({
            template: `
                <section class="& {{cardClassName}}">
                    <header class="&__head">
                        <avatar-component />
                        <h2 class="&__name {{nameClassName}}">{{user.display_name}}</h2>
                    </header>
                    <main class="&__body"><body-component /></main>
                    <footer class="&__foot {{footClassName}}"><foot-component /></footer>
                </section>
            `,
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
            props: {
                ...options.props,
                user: {display_name: ""},
            },
        })
    }
}

export default Settings
