import {Store, TOptions} from "~/src/core/store"
import {TState} from "../models"

class User extends Store<TState> {
    public constructor(initialState: Readonly<TState>, options: Omit<TOptions, "name">) {
        super(initialState, {
            ...options,
            name: "USER_STORE",
        })
    }
}

export default User
