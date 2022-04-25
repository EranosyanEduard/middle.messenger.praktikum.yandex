import {Auth, TNewUser, TOldUser, TUser} from "./auth"
import {TUpdatedPassword, TUpdatedUser, User} from "./user"
import {baseHeaders, getPath} from "./utils"

export default {
    auth: new Auth({
        headers: baseHeaders,
        url: getPath("auth"),
        withCredentials: true,
    }),
    user: new User({
        headers: baseHeaders,
        url: getPath("user"),
        withCredentials: true,
    }),
}

export {
    Auth as AuthApiClient,
    User as UserApiClient,
    TNewUser,
    TOldUser,
    TUpdatedPassword,
    TUpdatedUser,
    TUser,
}
