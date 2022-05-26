import {Store, TOptions} from "~/src/core/store"
import {TState} from "../models"

class Auth extends Store<TState> {
    public constructor(initialState: Readonly<TState>, options: Omit<TOptions, "name">) {
        super(initialState, {
            ...options,
            name: `${Auth.name}_store`.toUpperCase(),
        })
    }
}

export default Auth
