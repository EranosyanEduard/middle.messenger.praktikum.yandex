import {View} from "~/src/core/view"
import {BASE_URL_PATH} from "~/src/api-clients"
import popup from "../popup"
import {form} from "./components"
import {TOptions} from "./models"

function avatar(opts: TOptions) {
    const popupView = popup({
        views: {
            bodySection: form(async (field) => {
                const mustClosePopup = await opts.meths.onSubmit(field)
                if (mustClosePopup) {
                    popupView.show = false
                }
            }),
        },
    })

    return View.new({
        name: "Avatar",
        template: `
            <div :class="avatarClassName" class="avatar">
                <div :class="mainClassName" @click="openPopup" class="avatar__main">
                    <img
                        :class="imgClassName"
                        :src="imgSrc.avatar"
                        alt="Аватар"
                        class="avatar__img"
                        src="${BASE_URL_PATH}/resources">
                </div>
                <Popup></Popup>
            </div>
        `,
        meths: {
            openPopup() {
                if (!this.props.withoutPopup) {
                    popupView.show = true
                }
            },
        },
        props: opts.props,
        views: {
            popup: popupView,
        },
    })
}

export default avatar
