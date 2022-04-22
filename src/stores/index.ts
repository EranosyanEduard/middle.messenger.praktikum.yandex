import {User, userInitialState} from "./user"
import {useState} from "./utils"

export default {
    user: new User(userInitialState),
}

export {useState}
