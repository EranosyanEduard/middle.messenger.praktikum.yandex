import {TChat} from "~/src/api-clients"

export type TState = {activeChat: {id: number; token: string}; chats: TChat[]}
