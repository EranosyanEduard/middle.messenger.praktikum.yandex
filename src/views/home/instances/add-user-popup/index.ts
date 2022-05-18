import {button, popup} from "~/src/components"
import {searchUserForm, users} from "./instances"
import {is} from "~/src/utils"
import user from "~/src/views/home/components/users/item"
import controller from "~/src/controllers"

const addUserPopup = popup({
    views: {
        bodySection: [
            searchUserForm,
            users,
            button({
                meths: {
                    async onClick() {
                        const payload = {
                            chatId: NaN,
                            users: <number[]>[],
                        }

                        const key = "chatId"
                        const chatId = addUserPopup.props.store.get(key) ?? ""

                        addUserPopup.props.store.set(key, NaN)
                        payload.chatId = parseInt(`${chatId}`, 10)

                        if (is.arr(users.slots.users)) {
                            payload.users = (users.slots.users as ReturnType<typeof user>[])
                                .filter((v) => v.props.isActive)
                                .map((v) => v.props.user.id)
                        }

                        await controller.chat.addUsers(payload, addUserPopup)
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

export default addUserPopup
