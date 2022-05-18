import {Controller} from "~/src/core/controller"
import apiClient, {TUser, UserApiClient} from "~/src/api-clients"
import {input} from "~/src/components"
import store from "~/src/stores"
import {isValid, reset, values, xValidationErrorMessages} from "~/src/components/input/utils"
import {IUser, TPasswordFieldsetValues} from "../models"

class User extends Controller<UserApiClient> implements IUser {
    constructor() {
        super(apiClient.user)
    }

    async changeAvatar(field: ReturnType<typeof input>): Promise<boolean> {
        try {
            const inputEl = field.element.querySelector("input") as HTMLInputElement
            const file = inputEl.files?.item(0)

            if (file) {
                const formData = new FormData()
                formData.append("avatar", file)
                const {data} = await this.apiClient.update.avatar(formData)
                store.user.state.set("user", data)
                return true
            }
            return false
        } catch (e) {
            this.openErrorPage(e)
            return false
        }
    }

    async changePassword(fieldset: ReturnType<typeof input>[]) {
        try {
            if (isValid(fieldset)) {
                const {
                    againPassword,
                    newPassword,
                    password: oldPassword,
                } = values<TPasswordFieldsetValues>(fieldset)

                if (againPassword === newPassword) {
                    await this.apiClient.update.password({
                        newPassword,
                        oldPassword,
                    })
                    this.router.back()
                    reset(fieldset)
                } else {
                    const againPasswordInput = fieldset[fieldset.length - 1]
                    againPasswordInput.props.error = xValidationErrorMessages.passwordNotMatch
                }
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async changeUser(fieldset: ReturnType<typeof input>[]) {
        try {
            if (isValid(fieldset)) {
                const {data} = await this.apiClient.update.user(values(fieldset))
                store.user.state.set("user", data)
                this.router.back()
                reset(fieldset)
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async getUser(userId: number, cb: (user: Omit<TUser, "password">) => void) {
        try {
            const {data} = await this.apiClient.read.user(userId)
            cb(data)
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async searchUsers(
        field: ReturnType<typeof input>,
        cb: (userList: Omit<TUser, "password">[]) => void,
    ) {
        try {
            const fieldset = [field]
            if (isValid(fieldset)) {
                const {data} = await this.apiClient.read.users({login: field.props.value})
                cb(data)
                reset(fieldset)
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }
}

export default User
