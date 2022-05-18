import {TState} from "../models"

const initialState: TState = {
    activeChat: {
        id: NaN,
        token: "",
    },
    chats: [],
}

export default initialState
