import {button} from "~/src/components"
import addChatPopup from "../add-chat-popup"

export default button({
    meths: {
        onClick() {
            addChatPopup.show = true
        },
    },
    props: {
        className: "button_text",
        text: "Добавить чат",
        type: "button",
    },
})
