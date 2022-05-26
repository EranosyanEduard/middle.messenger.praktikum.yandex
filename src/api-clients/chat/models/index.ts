import {TUser} from "~/src/api-clients"

export const enum EEntryPoints {
    AVATAR = "avatar",
    CHATS = "",
    CHAT_USERS = ":chatId/users",
    TOKEN = "token/:chatId",
    USERS = "users",
}

export type TChat = {
    avatar: string
    id: number
    last_message: {
        content: string
        time: string
        user: Omit<TUser, "display_name" | "id" | "password">
    }
    title: string
    unread_count: number
}

export type TChatId = {chatId: TChat["id"]}

export type TChatTitle = Pick<TChat, "title">

export type TDeletedChat = {
    result: Omit<TChat, "last_message" | "unread_count">
    userId: TUser["id"]
}

export type TNewChatUsers = TChatId & {users: Array<TUser["id"]>}
