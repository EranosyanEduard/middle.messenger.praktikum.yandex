import {TNewChatUsers} from "~/src/api-clients"
import {input, popup} from "~/src/components"

export const enum EWebSocketMessageTypes {
    FILE = "file",
    GET_OLD = "get old",
    MESSAGE = "message",
    PING = "ping",
    PONG = "pong",
}

export type TWebSocketReq = {
    content?: string
    type: EWebSocketMessageTypes
}

export type TWebSocketResTypeMessage = {
    chat_id: number
    content: string
    time: string
    type: EWebSocketMessageTypes.FILE | EWebSocketMessageTypes.MESSAGE
    user_id: number
}

export type TWsResTypeService = {type: EWebSocketMessageTypes.PONG}

export type TWebSocketListeners = {
    message: (data: TWebSocketResTypeMessage | TWebSocketResTypeMessage[]) => void
} & Record<Exclude<keyof WebSocketEventMap, "message">, (evt: Event) => void>

export interface IChat {
    /**
     * @description
     * Добавить пользователей в чат.
     * @param body объект, содержащий идентификатор чата и список
     * идентификаторов пользователей.
     * @param popUp всплывающее окно при добавлении пользователей в чат.
     */
    addUsers(body: TNewChatUsers, popUp: ReturnType<typeof popup>): void

    /**
     * @description
     * Добавить аватар чата.
     * @param chatId идентификатор чата.
     * @param field поле ввода типа file.
     */
    changeAvatar(chatId: number, field: ReturnType<typeof input>): Promise<boolean>

    /**
     * @description
     * Создать чат.
     * @param field поле ввода заголовка чата.
     * @param popups всплывающие окна, необходимые для создания чата.
     */
    createChat(
        field: ReturnType<typeof input>,
        popups: Record<"addChat" | "addUser", ReturnType<typeof popup>>,
    ): void

    /**
     * @description
     * Удалить чат.
     * @param chatId идентификатор чата.
     */
    deleteChat(chatId: number): void

    /**
     * @description
     * Получить список чатов.
     */
    getChats(): void

    /**
     * @description
     * @param chatId идентификатор чата.
     */
    selectChat(chatId: number): void

    /**
     * Начать обмен сообщениями.
     * @param listeners коллекция обработчиков событий web-сокета.
     */
    startMessaging(listeners: TWebSocketListeners & ThisType<WebSocket>): void
}
