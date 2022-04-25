import {Auth, IAuth} from "./auth"
import {IUser, User} from "./user"

export default {
    auth: new Auth(),
    user: new User(),
}

export {IAuth as IAuthController, IUser as IUserController}
