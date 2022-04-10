import {UiLayout} from "~/src/layouts"
import {Anchor, Button} from "~/src/components"
import {factory, messageOptions, searchOptions} from "~/src/components/input/utils"
import {Chats} from "./components"
import {Messages} from "~/src/views/home/components"

const [messageInput, searchInput] = factory([messageOptions, searchOptions])

class HomePage extends UiLayout {
    constructor() {
        super({
            components: {
                aside: [
                    new Anchor({
                        props: {
                            bemBlock: "anchor",
                            className: "&_to_settings",
                            ref: "../settings/index.html",
                            text: "Профиль",
                        },
                    }),
                    searchInput,
                    new Chats({
                        props: {
                            bemBlock: "chats",
                            chats: [null, null, null],
                        },
                    }),
                ],
                main: [
                    new Messages({
                        props: {
                            bemBlock: "messages",
                            messagesClassName: "grid_col_all",
                        },
                    }),
                    messageInput,
                    new Button({
                        props: {
                            bemBlock: "button",
                            className: "&_icon_arrow-forward",
                            text: "",
                            type: "button",
                        },
                        emits: {
                            onClick() {
                                const [message] = messageInput.getProps(["value"], () => "fallback message")
                                console.log(message)
                            },
                        },
                    }),
                ],
            },
            props: {
                asideClassName: "&__area_with_chats box-shadow",
                bemBlock: "ui",
                boxClassName: "app",
                mainClassName: "&__area_with_messages",
            },
        })
    }
}

export default HomePage
