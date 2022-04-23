import {Auth, authInitialState, TAuthState} from "./auth"
import {TUserState, User, userInitialState} from "./user"
import {useState} from "./utils"

export default {
    auth: new Auth(authInitialState),
    user: new User(userInitialState),
}

export {useState, TAuthState, TUserState}
