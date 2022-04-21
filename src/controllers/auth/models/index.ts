import {TUser} from "~/src/api-clients"
import {Input} from "~/src/components"

export interface IAuth {
    /**
     * @description
     * Извлечь данные пользователя и обработать их.
     * @param cb обработчик данных пользователя.
     */
    getUser(cb: (user: TUser) => void): void

    /**
     * @description
     * Авторизовать пользователя.
     * @param fieldset список полей ввода.
     */
    signIn(fieldset: Input[]): void

    /**
     * @description
     * Выйти из приложения.
     */
    signOut(): void

    /**
     * @description
     * Зарегистрировать пользователя.
     * @param fieldset список полей ввода.
     */
    signUp(fieldset: Input[]): void
}
