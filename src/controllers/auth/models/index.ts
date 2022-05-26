import {input} from "~/src/components"

export interface IAuth {
    /**
     * @description
     * Извлечь данные пользователя и обработать их.
     */
    getUser(): void

    /**
     * @description
     * Авторизовать пользователя.
     * @param fieldset список полей ввода.
     */
    signIn(fieldset: ReturnType<typeof input>[]): void

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
    signUp(fieldset: ReturnType<typeof input>[]): void
}
