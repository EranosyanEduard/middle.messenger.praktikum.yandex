import {TUser} from "~/src/api-clients"
import {input} from "~/src/components"

export type TPasswordFieldsetValues = Record<"againPassword" | "newPassword" | "password", string>

export interface IUser {
    /**
     * @description
     * Изменить аватар пользователя.
     * @param field поле ввода типа file.
     */
    changeAvatar(field: ReturnType<typeof input>): Promise<boolean>

    /**
     * @description
     * Изменить пароль пользователя.
     * @param fieldset список полей ввода.
     */
    changePassword(fieldset: ReturnType<typeof input>[]): void

    /**
     * @description
     * Изменить данные пользователя.
     * @param fieldset список полей ввода.
     */
    changeUser(fieldset: ReturnType<typeof input>[]): void

    /**
     * @description
     * Получить пользователя с идентификатором [userId].
     * @param userId идентификатор пользователя.
     * @param cb обработчик пользователя.
     */
    getUser(userId: number, cb: (user: Omit<TUser, "password">) => void): void

    /**
     * @description
     * Найти пользователей по логину.
     * @param field поле ввода.
     * @param cb обработчик списка пользователей.
     */
    searchUsers(
        field: ReturnType<typeof input>,
        cb: (userList: Omit<TUser, "password">[]) => void,
    ): void
}
