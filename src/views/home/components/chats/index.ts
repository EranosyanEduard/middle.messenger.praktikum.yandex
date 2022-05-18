import {View, ViewOpts} from "~/src/core/view"
import {stub} from "~/src/components"
import controller from "~/src/controllers"
import store from "~/src/stores"
import {is, StrMeths} from "~/src/utils"
import chat from "./item"

function chats(opts: Required<Pick<ViewOpts<{listClassName: string}>, "props">>) {
    return View.new({
        name: "Chats",
        template: '<ul #aria-label="chats" :class="listClassName" class="chats"></ul>',
        slots: {
            chats: stub,
        },
        async didMount() {
            store.chat
                .watch(({key}) => {
                    if (key === "chats") {
                        if (is.arr(this.slots.chats)) {
                            const chatViewList = this.slots.chats as ReturnType<typeof chat>[]
                            chatViewList.forEach((v) => {
                                store.chat.watch(v.props.watchActiveChat).off()
                            })
                        }

                        this.slots.chats = store.chat.state.get("chats").map((it) => {
                            const {last_message: lastMsg, ...others} = it

                            const time = is.null(lastMsg)
                                ? ""
                                : StrMeths.toHumanFormatDate(lastMsg.time)

                            return chat({
                                props: {
                                    chat: {
                                        ...others,
                                        last_message: {
                                            ...(lastMsg ?? {}),
                                            time,
                                        },
                                    },
                                },
                            })
                        })
                    }
                })
                .on()

            await controller.chat.getChats()
        },
        ...opts,
    })
}

export default chats
