import {Store, TOptions} from "~/src/core/store"
import {TState} from "../models"

class Chat extends Store<TState> {
    public constructor(initialState: Readonly<TState>, options: Omit<TOptions, "name">) {
        super(initialState, {
            ...options,
            name: "CHAT_STORE",
        })
    }
}

export default Chat
