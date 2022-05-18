import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
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
        readChats: () => {
            const sendRequest = () => this.httpClient.get(EEntryPoints.CHATS, {})
            return this.send<TChat[]>(sendRequest)
        },
        updateAvatar: (body: FormData) => {
            const options = {
                body,
                headers: {
                    "content-type": "multipart/form-data",
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
        }
    }

    get read() {
        return {
            chats: this.actions.readChats,
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
