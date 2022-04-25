import {TUser} from "~/src/api-clients"

export type TState = {user: Omit<TUser, "password">}
