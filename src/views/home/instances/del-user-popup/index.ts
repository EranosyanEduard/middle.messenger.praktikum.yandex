import {TUser} from "~/src/api-clients"
import {button, popup} from "~/src/components"
import controller from "~/src/controllers"
import {is} from "~/src/utils"
import users from "../../components/users"
import user from "../../components/users/item"

const usersView = users()

const delUserPopup = popup({
    views: {
        bodySection: [
            usersView,
            button({
                meths: {
                    async onClick() {
                        const payload = {
                            chatId: NaN,
                            users: <number[]>[],
                        }

                        const key = "chatId"
                        const chatId = delUserPopup.props.store.get(key) ?? ""

                        delUserPopup.props.store.set(key, NaN)
                        payload.chatId = parseInt(`${chatId}`, 10)

                        if (is.arr(usersView.slots.users)) {
                            payload.users = (usersView.slots.users as ReturnType<typeof user>[])
                                .filter((v) => v.props.isActive)
                                .map((v) => v.props.user.id)
                        }

                        await controller.chat.deleteUsers(payload, delUserPopup)
                    },
                },
                props: {
                    className: "",
                    text: "Добавить",
                    type: "button",
                },
            }),
        ],
    },
})

delUserPopup.props.store.set("updateUsers", (userList: Omit<TUser, "password">[]) => {
    usersView.slots.users = userList.map((it) => user({props: {user: it}}))
})

export default delUserPopup
