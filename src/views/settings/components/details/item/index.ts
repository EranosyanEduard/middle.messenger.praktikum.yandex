import {Component, TComponentOpts} from "~/src/core/component"
import {TProps} from "./models"
import store, {TUserState, useState} from "~/src/stores"

@useState<TUserState>(store.user, ["user"])
class Item extends Component<TProps> {
    constructor(options: Pick<TComponentOpts<Omit<TProps, "user">>, "props">) {
        const {id} = options.props
        super({
            template: `
                <li class="&__item &__item_jc_space-between details">
                    <span class="details__term">{{term}}</span>
                    <span class="details__def">{{user.${id}}}</span>
                </li>
            `,
            props: {
                ...options.props,
                user: {
                    display_name: "",
                    email: "",
                    first_name: "",
                    login: "",
                    phone: "",
                    second_name: "",
                },
            },
        })
    }
}

export default Item
