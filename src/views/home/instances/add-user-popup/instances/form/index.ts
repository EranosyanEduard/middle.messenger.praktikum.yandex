import {form, stub, submitButton} from "~/src/components"
import controller from "~/src/controllers"
import {is} from "~/src/utils"
import {searchInput} from "../../../fieldset"
import users from "../users"
import user from "../../../../components/users/item"
import emptyListMessage from "../empty-list-message"

export default form({
    meths: {
        async onSubmit(evt: SubmitEvent) {
            evt.preventDefault()
            await controller.user.searchUsers(searchInput, (userList) => {
                if (is.empty.arr(userList)) {
                    users.slots.users = emptyListMessage
                } else {
                    users.slots.users = userList.map((it) => user({props: {user: it}}))
                }
            })
        },
    },
    props: {
        formClassName: "",
        legend: "Добавить пользователей",
    },
    views: {
        bodySection: searchInput,
        redirectButton: stub,
        submitButton: submitButton({
            className: "button_text",
            text: "Найти",
        }),
    },
})
