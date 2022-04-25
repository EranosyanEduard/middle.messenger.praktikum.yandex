import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {TUser} from "../../auth/models"
import {EEntryPoints, TUpdatedPassword, TUpdatedUser} from "../models"

class User extends ApiClient {
    public constructor(options: THttpClientOptions) {
        super(options)
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
                const sendRequest = () => this.httpClient.put(EEntryPoints.Avatar, options)
                return this.send<Omit<TUser, "password">>(sendRequest)
            },
            password: (body: TUpdatedPassword) => {
                const sendRequest = () => this.httpClient.put(EEntryPoints.Password, {body})
                return this.send(sendRequest)
            },
            user: (body: TUpdatedUser) => {
                const sendRequest = () => this.httpClient.put(EEntryPoints.Profile, {body})
                return this.send<Omit<TUser, "password">>(sendRequest)
            },
        }
    }
}

export default User
