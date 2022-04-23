import {Store} from "~/src/core/store"
import {TState} from "../models"

class Auth extends Store<TState> {
    public constructor(initialState: Readonly<TState>) {
        super(initialState)
    }
}

export default Auth
