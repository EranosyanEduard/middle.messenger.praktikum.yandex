import {Input} from "~/src/components"

export type TPasswordFieldsetValues = Record<"againPassword" | "newPassword" | "password", string>

export interface IUser {
    /**
     * @description
     * Изменить аватар пользователя.
     * @param field поле ввода типа file.
     */
    changeAvatar(field: Input): void

    /**
     * @description
     * Изменить пароль пользователя.
     * @param fieldset список полей ввода.
     */
    changePassword(fieldset: Input[]): void

    /**
     * @description
     * Изменить данные пользователя.
     * @param fieldset список полей ввода.
     */
    changeUser(fieldset: Input[]): void
}
