import {Store, TOptions} from "~/src/core/store"
import {TState} from "../models"

class Exception extends Store<TState> {
    public constructor(initialState: Readonly<TState>, options: Omit<TOptions, "name">) {
        super(initialState, {
            ...options,
            name: `${Exception.name}_store`.toUpperCase(),
        })
    }
}

export default Exception
