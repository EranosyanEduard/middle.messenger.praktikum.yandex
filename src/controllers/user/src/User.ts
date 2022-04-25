import {Controller} from "~/src/core/controller"
import apiClient, {TUpdatedUser, UserApiClient} from "~/src/api-clients"
import {Input} from "~/src/components"
import store from "~/src/stores"
import {getValues, isValid, reset, xValidationErrorMessages} from "~/src/components/input/utils"
import {IUser, TPasswordFieldsetValues} from "../models"

class User extends Controller<UserApiClient> implements IUser {
    constructor() {
        super(apiClient.user)
    }

    changeAvatar(field: Input): void {
        console.log(field)
    }

    async changePassword(fieldset: Input[]) {
        try {
            if (isValid(fieldset)) {
                const values = getValues<TPasswordFieldsetValues>(fieldset)
                const {againPassword, newPassword, password: oldPassword} = values

                if (againPassword === newPassword) {
                    await this.apiClient.update.password({
                        newPassword,
                        oldPassword,
                    })
                    reset(fieldset)
                    this.router.back()
                } else {
                    const input = fieldset[fieldset.length - 1]
                    input.props = {error: xValidationErrorMessages.passwordNotMatch}
                }
            }
        } catch (e) {
            this.openErrorPage()
        }
    }

    async changeUser(fieldset: Input[]) {
        try {
            if (isValid(fieldset)) {
                const values = getValues<TUpdatedUser>(fieldset)
                const {data} = await this.apiClient.update.user(values)
                store.user.state.set("user", data)
                reset(fieldset)
                this.router.back()
            }
        } catch (e) {
            this.openErrorPage()
        }
    }
}

export default User
