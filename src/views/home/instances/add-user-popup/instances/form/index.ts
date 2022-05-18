import {form, stub, submitButton} from "~/src/components"
import controller from "~/src/controllers"
import {searchInput} from "../../../fieldset"
import users from "../users"
import user from "../../../../components/users/item"

export default form({
    meths: {
        async onSubmit(evt: SubmitEvent) {
            evt.preventDefault()
            await controller.user.searchUsers(searchInput, (userList) => {
                users.slots.users = userList.map((it) => user({props: {user: it}}))
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
