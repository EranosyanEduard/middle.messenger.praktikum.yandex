import {Controller} from "~/src/core/controller"
import apiClient, {AuthApiClient, TNewUser, TOldUser} from "~/src/api-clients"
import {Input} from "~/src/components"
import {routeNames} from "~/src/router"
import store from "~/src/stores"
import {getValues, isValid, reset, xValidationErrorMessages} from "~/src/components/input/utils"
import {IAuth} from "../models"

class Auth extends Controller<AuthApiClient> implements IAuth {
    constructor() {
        super(apiClient.auth)
    }

    async getUser() {
        try {
            const {data} = await this.apiClient.read.user()
            store.user.state.set("user", data)
        } catch (e) {
            this.openErrorPage()
        }
    }

    async signIn(fieldset: Input[]) {
        try {
            if (isValid(fieldset)) {
                const values = getValues<TOldUser>(fieldset)
                await this.apiClient.create.session(values)
                store.auth.state.set("isAuth", true)
                reset(fieldset)
                this.router.go({name: routeNames.messenger})
            }
        } catch (e) {
            this.openErrorPage()
        }
    }

    async signOut() {
        try {
            await this.apiClient.delete.session()
            store.auth.state.set("isAuth", false)
            localStorage.clear()
        } catch (e) {
            this.openErrorPage()
        }
    }

    async signUp(fieldset: Input[]) {
        try {
            if (isValid(fieldset)) {
                const values = getValues<TNewUser & {againPassword: string}>(fieldset)
                const {againPassword, ...user} = values

                if (againPassword === user.password) {
                    const {
                        data: {id},
                    } = await this.apiClient.create.user(user)

                    store.auth.state.set("isAuth", true)
                    store.user.state.set("userId", id)
                    reset(fieldset)
                    this.router.go({name: routeNames.messenger})
                } else {
                    const input = fieldset[fieldset.length - 1]
                    input.props = {error: xValidationErrorMessages.passwordNotMatch}
                }
            }
        } catch (e) {
            this.openErrorPage()
        }
    }
}

export default Auth
