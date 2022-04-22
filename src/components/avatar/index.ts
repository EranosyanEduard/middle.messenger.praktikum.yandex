import {Component, TComponentOptions} from "~/src/core/component"
import store, {TUserState, useState} from "~/src/stores"
import {TProps} from "./models"

@useState<TUserState>(store.user, ["user"])
class Avatar extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<Omit<TProps, "user">>, "props">) {
        super({
            template: `
                <div class="& {{avatarClassName}}">
                    <img
                        src="{{user.avatar}}"
                        alt="Изображение пользователя"
                        class="&__img {{imgClassName}}">
                </div>
            `,
            props: {
                ...options.props,
                user: {avatar: ""},
            },
        })
    }
}

export default Avatar
