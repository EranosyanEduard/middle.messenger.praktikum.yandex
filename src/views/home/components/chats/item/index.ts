import {IView, View, ViewOpts} from "~/src/core/view"
import {TChat} from "~/src/api-clients"
import {avatar, button} from "~/src/components"
import controller from "~/src/controllers"
import store from "~/src/stores"
import delUserPopup from "../../../instances/del-user-popup"

function chat(opts: Required<Pick<ViewOpts<{chat: TChat}>, "props">>) {
    function setMenuState(
        view: IView<{chat: TChat; menuClassName: string}, never>,
        state: boolean,
    ) {
        view.props.menuClassName = state ? "chat__actions_open" : ""
    }

    const {avatar: avatarSrc = "", id, unread_count: unreadCount} = opts.props.chat

    const avatarView = avatar({
        meths: {
            async onSubmit(field) {
                const isOK = await controller.chat.changeAvatar(id, field)
                return isOK
            },
        },
        props: {
            avatarClassName: "grid_row_all",
            imgClassName: "",
            imgSrc: {avatar: avatarSrc},
            mainClassName: "",
            withoutPopup: false,
        },
    })

    const chatView = View.new({
        name: "Chat",
        template: `
            <li :class="chatClassName" @contextmenu="openMenu" class="chats__item chat">
                <div @click="selectChat" class="chat__card">
                    <Avatar></Avatar>
                    <span :text="chat.title" class="chat__title"></span>
                    <span :text="chat.last_message.time" class="chat__date"></span>
                    <span
                        :class="newMessageCountClassName"
                        :text="chat.unread_count"
                        class="chat__new-msg-count">
                    </span>
                    <span :text="chat.last_message.content" class="chat__msg"></span>
                </div>
                <div class="chat__menu">
                    <ul :class="menuClassName" class="chat__actions">
                        <li class="chat__action"><DelUserButton></DelUserButton></li>
                        <li class="chat__action"><DelButton></DelButton></li>
                    </ul>
                </div>
            </li>
        `,
        didMount() {
            store.chat.watch(this.props.watchActiveChat).on()
        },
        meths: {
            openMenu(evt: Event) {
                evt.preventDefault()
                setMenuState(chatView, true)
            },
            async selectChat(evt: PointerEvent) {
                const isAvatar = evt
                    .composedPath()
                    .some((it) => it instanceof HTMLElement && it.className.includes("avatar"))

                if (!isAvatar) {
                    await controller.chat.selectChat(id)
                }
            },
        },
        props: {
            chatClassName: "",
            menuClassName: "",
            newMessageCountClassName: unreadCount === 0 ? "chat__new-msg-count_hidden" : "",
            watchActiveChat: <Parameters<typeof store.chat.watch>[0]>(({key}) => {
                if (key === "activeChat") {
                    const {id: activeChatId} = store.chat.state.get(key)
                    chatView.props.chatClassName = activeChatId === id ? "chat_active" : ""
                }
            }),
            ...opts.props,
        },
        views: {
            avatar: avatarView,
            delButton: button({
                meths: {
                    async onClick() {
                        await controller.chat.deleteChat(id)
                        setMenuState(chatView, false)
                    },
                },
                props: {
                    className: "button_text button_text-color_error",
                    text: "Удалить чат",
                    type: "button",
                },
            }),
            delUserButton: button({
                meths: {
                    async onClick() {
                        await controller.chat.getUsers(id, delUserPopup)
                        setMenuState(chatView, false)
                    },
                },
                props: {
                    className: "button_text button_text-color_error",
                    text: "Удалить пользователей из чата",
                    type: "button",
                },
            }),
        },
    })

    document.addEventListener("click", () => {
        setMenuState(chatView, false)
    })

    return chatView
}

export default chat
