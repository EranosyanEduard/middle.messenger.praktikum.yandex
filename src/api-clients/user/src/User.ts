import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {TUser} from "../../auth/models"
import {EEntryPoints, TUpdatedPassword, TUpdatedUser} from "../models"

class User extends ApiClient {
    private readonly actions = {
        readUser: (userId: number) => {
            const entryPoint = EEntryPoints.USER.replace(":userId", `${userId}`)
            const sendRequest = () => this.httpClient.get(entryPoint, {})
            return this.send<Omit<TUser, "password">>(sendRequest)
        },
        readUsers: (body: Pick<TUser, "login">) => {
            const sendRequest = () => this.httpClient.post(EEntryPoints.SEARCH, {body})
            return this.send<Omit<TUser, "password">[]>(sendRequest)
        },
        updateAvatar: (body: FormData) => {
            const options = {
                body,
                headers: {
                    accept: "application/json",
                    "content-type": "",
                },
            }
            const sendRequest = () => this.httpClient.put(EEntryPoints.AVATAR, options)
            return this.send<Omit<TUser, "password">>(sendRequest)
        },
        updatePassword: (body: TUpdatedPassword) => {
            const sendRequest = () => this.httpClient.put(EEntryPoints.PASSWORD, {body})
            return this.send(sendRequest)
        },
        updateUser: (body: TUpdatedUser) => {
            const sendRequest = () => this.httpClient.put(EEntryPoints.PROFILE, {body})
            return this.send<Omit<TUser, "password">>(sendRequest)
        },
    } as const

    public constructor(options: THttpClientOptions) {
        super(options)
    }

    get read() {
        return {
            user: this.actions.readUser,
            users: this.actions.readUsers,
        }
    }

    get update() {
        return {
            avatar: this.actions.updateAvatar,
            password: this.actions.updatePassword,
            user: this.actions.updateUser,
        }
    }
}

export default User
