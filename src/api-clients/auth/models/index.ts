export const enum EEntryPoints {
    SignIn = "signin",
    SignOut = "logout",
    SignUp = "signup",
    User = "user",
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
