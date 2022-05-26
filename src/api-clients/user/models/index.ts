import {TUser} from "../../auth/models"

export const enum EEntryPoints {
    AVATAR = "profile/avatar",
    PASSWORD = "password",
    PROFILE = "profile",
    SEARCH = "search",
    USER = ":userId",
}

export type TUpdatedPassword = Record<"newPassword" | "oldPassword", string>

export type TUpdatedUser = Omit<TUser, "avatar" | "id" | "password">
