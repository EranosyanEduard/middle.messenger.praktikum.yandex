import {Auth, TNewUser, TOldUser, TUser} from "./auth"
import {baseHeaders, getPath} from "./utils"

export default {
    auth: new Auth({
        headers: baseHeaders,
        url: getPath("auth"),
    }),
}

export {Auth as AuthApiClient, TNewUser, TOldUser, TUser}