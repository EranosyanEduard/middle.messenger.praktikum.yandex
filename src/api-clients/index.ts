import {Auth, TNewUser, TOldUser, TUser} from "./auth"
import {Chat, TChat, TChatId, TChatTitle, TNewChatUsers} from "./chat"
import {TUpdatedPassword, TUpdatedUser, User} from "./user"
import {BASE_DOMAIN, BASE_URL_PATH, getBaseApiClientOpts} from "./utils"

export default {
    auth: new Auth(getBaseApiClientOpts("auth")),
    chat: new Chat(getBaseApiClientOpts("chat")),
    user: new User(getBaseApiClientOpts("user")),
}

export {
    BASE_DOMAIN,
    BASE_URL_PATH,
    Auth as AuthApiClient,
    Chat as ChatApiClient,
    User as UserApiClient,
    TChat,
    TChatId,
    TChatTitle,
    TNewChatUsers,
    TNewUser,
    TOldUser,
    TUpdatedPassword,
    TUpdatedUser,
    TUser,
}
