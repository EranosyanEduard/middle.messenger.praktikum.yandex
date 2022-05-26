import {Auth, authInitialState, TAuthState} from "./auth"
import {Chat, chatInitialState, TChatState} from "./chat"
import {Exception, exceptionInitialState, TExceptionState} from "./exception"
import {TUserState, User, userInitialState} from "./user"
import {useState} from "./utils"

export default {
    auth: new Auth(authInitialState, {isPersist: true}),
    chat: new Chat(chatInitialState, {isPersist: true}),
    exception: new Exception(exceptionInitialState, {isPersist: true}),
    user: new User(userInitialState, {isPersist: true}),
}

export {useState, TAuthState, TChatState, TExceptionState, TUserState}
