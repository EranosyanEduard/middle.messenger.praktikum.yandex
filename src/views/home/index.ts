import {uiLayout} from "~/src/layouts"
import {
    addChatButton,
    addChatPopup,
    addUserPopup,
    chats,
    delUserPopup,
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
            optionalSection: [addChatPopup, addUserPopup, delUserPopup],
        },
    })
}

export default homeView
