import {Auth, authInitialState, TAuthState} from "./auth"
import {TUserState, User, userInitialState} from "./user"
import {useState} from "./utils"

export default {
    auth: new Auth(authInitialState, {isPersist: true}),
    user: new User(userInitialState, {isPersist: true}),
}

export {useState, TAuthState, TUserState}
