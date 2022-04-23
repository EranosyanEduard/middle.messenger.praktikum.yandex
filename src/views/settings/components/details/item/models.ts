import {TUser} from "~/src/api-clients"

type TPropKey = "bemBlock" | "term"

export type TUserKey = Exclude<keyof TUser, "avatar" | "id" | "password">

export type TProps = Record<TPropKey, string> & {
    id: TUserKey
    user: Pick<TUser, TUserKey>
}
