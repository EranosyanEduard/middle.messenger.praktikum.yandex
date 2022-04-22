import {Store} from "~/src/core/store"
import {TState} from "../models"

class User extends Store<TState> {
    public constructor(initialState: Readonly<TState>) {
        super(initialState)
    }
}

export default User
