import {View, ViewOpts} from "~/src/core/view"
import {avatar} from "~/src/components"
import controller, {TWsChatMessage} from "~/src/controllers"
import store from "~/src/stores"
import {StrMeths} from "~/src/utils"

function message(opts: Required<Pick<ViewOpts<{msg: TWsChatMessage}>, "props">>) {
    const {
        props: {
            msg: {content, time, user_id: userId},
        },
    } = opts

    const date = new Date(time)
    const hh = `${date.getHours()}`.padStart(2, "0")
    const mm = `${date.getMinutes()}`.padStart(2, "0")
    const msgDate = `${StrMeths.toHumanFormatDate(time)}, ${hh}:${mm}`

    const isItI = store.user.state.get("user").id === userId

    const avatarView = avatar({
        meths: {
            onSubmit: () => Promise.resolve(true),
        },
        props: {
            avatarClassName: "grid_row_all",
            imgClassName: "",
            imgSrc: {avatar: ""},
            mainClassName: "avatar__main_no_hover",
            withoutPopup: true,
        },
    })

    return View.new({
        name: "Message",
        template: `
            <div class="message ${isItI ? "" : "message_user_friend"}">
                <Avatar></Avatar>
                <span :text="author" class="message__author"></span>
                <span class="message__time">${msgDate}</span>
                <span class="message__text">${content}</span>
            </div>
        `,
        async didMount() {
            await controller.user.getUser(userId, (user) => {
                this.props.author = user.display_name
                avatarView.props.imgSrc = {avatar: user.avatar}
            })
        },
        props: {
            author: "",
        },
        views: {
            avatar: avatarView,
        },
    })
}

export default message
