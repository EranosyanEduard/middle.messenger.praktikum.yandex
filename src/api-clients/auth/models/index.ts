export const enum EEntryPoints {
    SIGN_IN = "signin",
    SIGN_OUT = "logout",
    SIGN_UP = "signup",
    USER = "user",
}

type TUserField =
    | "avatar"
    | "display_name"
    | "email"
    | "first_name"
    | "id"
    | "login"
    | "password"
    | "phone"
    | "second_name"

export type TUser = Record<Exclude<TUserField, "id">, string> & {id: number}

export type TNewUser = Omit<TUser, "avatar" | "display_name" | "id">

export type TOldUser = Pick<TUser, "login" | "password">
