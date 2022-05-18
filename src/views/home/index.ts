import {uiLayout} from "~/src/layouts"
import {
    addChatButton,
    addChatPopup,
    addUserPopup,
    chats,
    messages,
    redirectButton,
} from "./instances"

function homeView() {
    return uiLayout({
        props: {
            asideClassName: "ui__area_with_chats box-shadow",
            mainClassName: "ui__area_with_messages",
        },
        views: {
            asideSection: [addChatButton, redirectButton, chats],
            mainSection: messages,
            optionalSection: [addChatPopup, addUserPopup],
        },
    })
}

export default homeView
