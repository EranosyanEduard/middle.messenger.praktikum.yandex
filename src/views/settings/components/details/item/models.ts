import {TUser} from "~/src/api-clients"
import {ViewOpts} from "~/src/core/view"

export type TUserProp = Pick<TUser, Exclude<keyof TUser, "avatar" | "id" | "password">>

export type TProps = Record<"def" | "term", string> & {user: TUserProp}

export type TOptions = Required<Pick<ViewOpts<Omit<TProps, "user">>, "props">>
