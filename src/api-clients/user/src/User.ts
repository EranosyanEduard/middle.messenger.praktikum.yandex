import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {TUser} from "../../auth/models"
import {EEntryPoints, TUpdatedPassword, TUpdatedUser} from "../models"

class User extends ApiClient {
    public constructor(options: THttpClientOptions) {
        super(options)
    }

    get read() {
        return {
            user: (userId: number) => {
                const entryPoint = EEntryPoints.USER.replace(":userId", `${userId}`)
                const sendRequest = () => this.httpClient.get(entryPoint, {})
                return this.send<Omit<TUser, "password">>(sendRequest)
            },
            users: (body: Pick<TUser, "login">) => {
                const sendRequest = () => this.httpClient.post(EEntryPoints.SEARCH, {body})
                return this.send<Omit<TUser, "password">[]>(sendRequest)
            },
        }
    }

    get update() {
        return {
            avatar: (body: FormData) => {
                const options = {
                    body,
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
                const sendRequest = () => this.httpClient.put(EEntryPoints.AVATAR, options)
                return this.send<Omit<TUser, "password">>(sendRequest)
            },
            password: (body: TUpdatedPassword) => {
                const sendRequest = () => this.httpClient.put(EEntryPoints.PASSWORD, {body})
                return this.send(sendRequest)
            },
            user: (body: TUpdatedUser) => {
                const sendRequest = () => this.httpClient.put(EEntryPoints.PROFILE, {body})
                return this.send<Omit<TUser, "password">>(sendRequest)
            },
        }
    }
}

export default User
