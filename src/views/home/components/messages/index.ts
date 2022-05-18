import {IView, View} from "~/src/core/view"
import {button, stub} from "~/src/components"
import {factory, messageOptions} from "~/src/components/input/utils"
import controller, {EWsChatMessageTypes, TWsChatReq} from "~/src/controllers"
import store from "~/src/stores"
import {is} from "~/src/utils"
import {TRecord} from "~/src/models/common"
import item from "~/src/views/home/components/messages/item"

function messages() {
    const toMessage = (msg: TWsChatReq) => JSON.stringify(msg)

    const [messageInput] = factory([messageOptions])

    const view = View.new({
        name: "Messages",
        template: `
            <div
                :class="chatContentClassName"
                class="chat-content"
                data-fallback-msg="Выберите чат"
            >
                <ul #aria-label="messages" class="chat-content__messages"></ul>
                <MessageInput></MessageInput>
                <SendButton></SendButton>
            </div>
        `,
        didMount() {
            const watcher: Parameters<typeof store.chat.watch>[0] = ({key}) => {
                if (key === "activeChat") {
                    if (!is.empty.str(this.props.chatContentClassName)) {
                        this.props.chatContentClassName = ""
                    }

                    controller.chat.startMessaging({
                        close() {},
                        error() {},
                        message(data) {
                            let slot: IView<TRecord, string>[]

                            if (is.arr(data)) {
                                slot = data.reverse().map((msg) => item({props: {msg}}))
                            } else {
                                const newMsgView = item({props: {msg: data}})
                                if (is.arr(view.slots.messages)) {
                                    slot = [...view.slots.messages, newMsgView]
                                } else {
                                    slot = [view.slots.messages, newMsgView]
                                }
                            }

                            view.slots.messages = slot
                        },
                        open() {
                            view.props.webSocket = this
                            this.send(
                                toMessage({
                                    content: "0",
                                    type: EWsChatMessageTypes.GET_OLD,
                                }),
                            )
                        },
                    })
                }
            }

            store.chat.watch(watcher).on()
        },
        props: {
            chatContentClassName: "chat-content_inactive",
            webSocket: null as WebSocket | null,
        },
        slots: {
            messages: stub,
        },
        views: {
            messageInput,
            sendButton: button({
                meths: {
                    onClick() {
                        if (!is.null(view.props.webSocket)) {
                            view.props.webSocket.send(
                                toMessage({
                                    content: messageInput.props.value,
                                    type: EWsChatMessageTypes.MESSAGE,
                                }),
                            )
                        }
                    },
                },
                props: {
                    className: "button_icon button_icon_arrow-forward",
                    text: "",
                    type: "button",
                },
            }),
        },
    })

    return view
}

export default messages
