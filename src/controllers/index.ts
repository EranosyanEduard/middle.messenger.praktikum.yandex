import {Auth, IAuth} from "./auth"
import {Chat, EWebSocketMessageTypes, IChat, TWebSocketReq, TWebSocketResTypeMessage} from "./chat"
import {IUser, User} from "./user"

export default {
    auth: new Auth(),
    chat: new Chat(),
    user: new User(),
}

export {
    IAuth as IAuthController,
    IChat as IChatController,
    IUser as IUserController,
    EWebSocketMessageTypes as EWsChatMessageTypes,
    TWebSocketReq as TWsChatReq,
    TWebSocketResTypeMessage as TWsChatMessage,
}
