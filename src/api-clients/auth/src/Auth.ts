import {ApiClient} from "~/src/core/api-client"
import {THttpClientOptions} from "~/src/core/http-client"
import {EEntryPoints, TNewUser, TOldUser, TUser} from "../models"

class Auth extends ApiClient {
    private readonly actions = {
        createSession: (body: TOldUser) => {
            const sendRequest = () => this.httpClient.post(EEntryPoints.SIGN_IN, {body})
            return this.send(sendRequest)
        },
        createUser: (body: TNewUser) => {
            const sendRequest = () => this.httpClient.post(EEntryPoints.SIGN_UP, {body})
            return this.send<Pick<TUser, "id">>(sendRequest)
        },
        deleteSession: () => this.send(() => this.httpClient.post(EEntryPoints.SIGN_OUT, {})),
        readUser: () => this.send<TUser>(() => this.httpClient.get(EEntryPoints.USER, {})),
    } as const

    public constructor(options: THttpClientOptions) {
        super(options)
    }

    get create() {
        return {
            session: this.actions.createSession,
            user: this.actions.createUser,
        }
    }

    get delete() {
        return {
            session: this.actions.deleteSession,
        }
    }

    get read() {
        return {
            user: this.actions.readUser,
        }
    }
}

export default Auth
