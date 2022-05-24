import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {TUser} from "~/src/api-clients"
import {EEntryPoints, TChat, TChatId, TChatTitle, TDeletedChat, TNewChatUsers} from "../models"

class Chat extends ApiClient {
    private readonly actions = {
        connectToChat: (body: TChatId) => {
            const entryPoint = EEntryPoints.TOKEN.replace(":chatId", `${body.chatId}`)
            const sendRequest = () => this.httpClient.post(entryPoint, {})
            return this.send<{token: string}>(sendRequest)
        },
        createChat: (body: TChatTitle) => {
            const sendRequest = () => this.httpClient.post(EEntryPoints.CHATS, {body})
            return this.send(sendRequest)
        },
        deleteChat: (body: TChatId) => {
            const sendRequest = () => this.httpClient.delete(EEntryPoints.CHATS, {body})
            return this.send<TDeletedChat>(sendRequest)
        },
        deleteUsers: (body: TNewChatUsers) => {
            const sendRequest = () => this.httpClient.delete(EEntryPoints.USERS, {body})
            return this.send(sendRequest)
        },
        readChats: () => {
            const sendRequest = () => this.httpClient.get(EEntryPoints.CHATS, {})
            return this.send<TChat[]>(sendRequest)
        },
        readUsers: (body: TChatId) => {
            const entryPoint = EEntryPoints.CHAT_USERS.replace(":chatId", `${body.chatId}`)
            const sendRequest = () => this.httpClient.get(entryPoint, {})
            return this.send<Omit<TUser, "password">[]>(sendRequest)
        },
        updateAvatar: (body: FormData) => {
            const options = {
                body,
                headers: {
                    accept: "application/json",
                    "content-type": "",
                },
            }
            const sendRequest = () => this.httpClient.put(EEntryPoints.AVATAR, options)
            return this.send<TChat>(sendRequest)
        },
        updateUsers: (body: TNewChatUsers) => {
            const sendRequest = () => this.httpClient.put(EEntryPoints.USERS, {body})
            return this.send(sendRequest)
        },
    } as const

    public constructor(options: THttpClientOptions) {
        super(options)
    }

    get create() {
        return {
            chat: this.actions.createChat,
            connection: this.actions.connectToChat,
        }
    }

    get delete() {
        return {
            chat: this.actions.deleteChat,
            users: this.actions.deleteUsers,
        }
    }

    get read() {
        return {
            chats: this.actions.readChats,
            users: this.actions.readUsers,
        }
    }

    get update() {
        return {
            avatar: this.actions.updateAvatar,
            users: this.actions.updateUsers,
        }
    }
}

export default Chat
