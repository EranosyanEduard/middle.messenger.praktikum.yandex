import {Controller} from "~/src/core/controller"
import apiClient, {AuthApiClient, TNewUser} from "~/src/api-clients"
import {input} from "~/src/components"
import {routeNames} from "~/src/router"
import store from "~/src/stores"
import {isValid, reset, values, xValidationErrorMessages} from "~/src/components/input/utils"
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
            this.openErrorPage(e)
        }
    }

    async signIn(fieldset: ReturnType<typeof input>[]) {
        try {
            if (isValid(fieldset)) {
                await this.apiClient.create.session(values(fieldset))
                await this.getUser()
                store.auth.state.set("isAuth", true)
                this.router.go({name: routeNames.messenger})
                reset(fieldset)
            }
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async signOut() {
        try {
            await this.apiClient.delete.session()
            localStorage.clear()
        } catch (e) {
            this.openErrorPage(e)
        }
    }

    async signUp(fieldset: ReturnType<typeof input>[]) {
        try {
            if (isValid(fieldset)) {
                const {againPassword, ...user} = values<TNewUser & {againPassword: string}>(
                    fieldset,
                )
                if (againPassword === user.password) {
                    await this.apiClient.create.user(user)
                    store.auth.state.set("isAuth", true)
                    this.router.go({name: routeNames.messenger})
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
}

export default Auth
