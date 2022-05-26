import {Controller} from "~/src/core/controller"
import apiClient, {BASE_DOMAIN, ChatApiClient, TNewChatUsers} from "~/src/api-clients"
import {input, popup} from "~/src/components"
import store from "~/src/stores"
import {is} from "~/src/utils"
import {isValid, reset} from "~/src/components/input/utils"
import {
    EWebSocketMessageTypes,
    IChat,
    TWebSocketListeners,
    TWebSocketResTypeMessage,
    TWsResTypeService,
} from "../models"

class Chat extends Controller<ChatApiClient> implements IChat {
    constructor() {
        super(apiClient.chat)
    }

    async addUsers(body: TNewChatUsers, popUp: ReturnType<typeof popup>) {
        try {
            await this.apiClient.update.users(body)
            popUp.show = false
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async changeAvatar(chatId: number, field: ReturnType<typeof input>): Promise<boolean> {
        try {
            const inputEl = field.element.querySelector("input") as HTMLInputElement
            const file = inputEl.files?.item(0)

            if (file) {
                const formData = new FormData()
                formData.append("chatId", `${chatId}`)
                formData.append("avatar", file)
                await this.apiClient.update.avatar(formData)
                await this.getChats()
                return true
            }
            return false
        } catch (e) {
            this.openErrorPage(e)
            return false
        }
    }

    async createChat(
        field: ReturnType<typeof input>,
        popups: Record<"addChat" | "addUser", ReturnType<typeof popup>>,
    ) {
        try {
            const fieldset = [field]
            if (isValid(fieldset)) {
                await this.apiClient.create.chat({title: field.props.value})
                await this.getChats()

                const [createdChat] = store.chat.state.get("chats")

                popups.addChat.show = false
                popups.addUser.show = true
                popups.addUser.props.store.set("chatId", createdChat.id)
                reset(fieldset)
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async deleteChat(chatId: number) {
        try {
            if (is.int(chatId)) {
                await this.apiClient.delete.chat({chatId})
                await this.getChats()

                const {id: activeChatId} = store.chat.state.get("activeChat")
                if (activeChatId === chatId) {
                    store.chat.state.set("activeChat", {
                        id: NaN,
                        token: "",
                    })
                }
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async deleteUsers(body: TNewChatUsers, popUp: ReturnType<typeof popup>) {
        try {
            await this.apiClient.delete.users(body)
            popUp.show = false

            const {id: userId} = store.user.state.get("user")
            if (body.users.some((id) => id === userId)) {
                await this.getChats()
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async getChats() {
        try {
            const {data} = await this.apiClient.read.chats()
            store.chat.state.set("chats", data)
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async getUsers(chatId: number, popUp: ReturnType<typeof popup>) {
        try {
            const {data} = await this.apiClient.read.users({chatId})
            const popupUpdater = popUp.props.store.get("updateUsers")

            if (is.fun(popupUpdater)) {
                popUp.props.store.set("chatId", chatId)
                popupUpdater(data)
                popUp.show = true
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async selectChat(chatId: number) {
        try {
            const {
                data: {token},
            } = await this.apiClient.create.connection({chatId})

            store.chat.state.set("activeChat", {
                id: chatId,
                token,
            })
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    startMessaging(listeners: TWebSocketListeners & ThisType<WebSocket>) {
        const {id: userId} = store.user.state.get("user")
        const {id: chatId, token} = store.chat.state.get("activeChat")
        const socket = new WebSocket(`wss://${BASE_DOMAIN}/ws/chats/${userId}/${chatId}/${token}`)

        // "Прикрепить" сокет в качестве контекста к обработчикам событий.
        const boundedCallbacks = Object.entries(listeners).reduce((acc, [key, val]) => {
            acc[key as keyof TWebSocketListeners] = val.bind(socket)
            return acc
        }, {} as TWebSocketListeners)
        let intervalId: NodeJS.Timer

        socket.addEventListener("close", (evt) => {
            boundedCallbacks.close(evt)
            clearInterval(intervalId)
        })

        socket.addEventListener("error", (evt) => {
            boundedCallbacks.error(evt)
        })

        socket.addEventListener("message", (evt: MessageEvent<string>) => {
            let data: TWebSocketResTypeMessage | TWebSocketResTypeMessage[] | TWsResTypeService

            try {
                data = JSON.parse(evt.data)
            } catch (e) {
                data = {type: EWebSocketMessageTypes.PONG}
            }

            if (is.arr(data) || data.type !== EWebSocketMessageTypes.PONG) {
                boundedCallbacks.message(data)
            }
        })

        socket.addEventListener("open", (evt) => {
            boundedCallbacks.open(evt)
            intervalId = setInterval(() => {
                socket.send(JSON.stringify({type: EWebSocketMessageTypes.PING}))
            }, 1000)
        })
    }
}

export default Chat
