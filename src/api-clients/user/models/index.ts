import {TUser} from "../../auth/models"

export const enum EEntryPoints {
    Avatar = "profile/avatar",
    Password = "password",
    Profile = "profile",
    Search = "search",
    UserId = ":id",
}

export type TUpdatedPassword = Record<"newPassword" | "oldPassword", string>

export type TUpdatedUser = Omit<TUser, "avatar" | "id" | "password">
