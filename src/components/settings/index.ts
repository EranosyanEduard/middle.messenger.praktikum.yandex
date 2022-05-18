import {View} from "~/src/core/view"
import controller from "~/src/controllers"
import store, {TUserState, useState} from "~/src/stores"
import avatar from "../avatar"
import {TOptions} from "./models"

function settings(opts: TOptions) {
    function decorate(propKeyList: Parameters<typeof useState>[2] = []) {
        return useState<TUserState>(store.user, ["user"], propKeyList)
    }

    return decorate()(
        View.new({
            name: "Settings",
            template: `
                <section :class="cardClassName" class="settings">
                    <header class="settings__head">
                        <Avatar></Avatar>
                        <h2 :class="nameClassName" :text="user.display_name" class="settings__name">
                        </h2>
                    </header>
                    <main class="settings__body">
                        <BodySection></BodySection>
                    </main>
                    <footer class="settings__foot" :class="footClassName">
                        <FootSection></FootSection>
                    </footer>
                </section>
            `,
            props: {
                user: {display_name: ""},
                ...opts.props,
            },
            views: {
                avatar: decorate(["imgSrc"])(
                    avatar({
                        meths: {
                            async onSubmit(field) {
                                const isOK = await controller.user.changeAvatar(field)
                                return isOK
                            },
                        },
                        props: {
                            avatarClassName: "avatar_size_lg",
                            imgClassName: "avatar__img_empty",
                            imgSrc: {avatar: ""},
                            mainClassName: "",
                            withoutPopup: false,
                        },
                    }),
                ),
                ...opts.views,
            },
        }),
    )
}

export default settings
