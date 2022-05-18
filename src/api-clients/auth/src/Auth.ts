import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {EEntryPoints, TNewUser, TOldUser, TUser} from "../models"

class Auth extends ApiClient {
    public constructor(options: THttpClientOptions) {
        super(options)
    }

    get create() {
        return {
            session: (body: TOldUser) => {
                const sendRequest = () => this.httpClient.post(EEntryPoints.SIGN_IN, {body})
                return this.send(sendRequest)
            },
            user: (body: TNewUser) => {
                const sendRequest = () => this.httpClient.post(EEntryPoints.SIGN_UP, {body})
                return this.send<Pick<TUser, "id">>(sendRequest)
            },
        }
    }

    get delete() {
        return {
            session: () => this.send(() => this.httpClient.post(EEntryPoints.SIGN_OUT, {})),
        }
    }

    get read() {
        return {
            user: () => this.send<TUser>(() => this.httpClient.get(EEntryPoints.USER, {})),
        }
    }
}

export default Auth
