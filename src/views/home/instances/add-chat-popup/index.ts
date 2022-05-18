import {form, popup, stub, submitButton} from "~/src/components"
import controller from "~/src/controllers"
import addUserPopup from "../add-user-popup"
import {chatTitleInput} from "../fieldset"

const addChatPopup = popup({
    views: {
        bodySection: form({
            meths: {
                async onSubmit(evt: SubmitEvent) {
                    evt.preventDefault()
                    await controller.chat.createChat(chatTitleInput, {
                        addChat: addChatPopup,
                        addUser: addUserPopup,
                    })
                },
            },
            props: {
                formClassName: "",
                legend: "Добавить чат",
            },
            views: {
                bodySection: chatTitleInput,
                redirectButton: stub,
                submitButton: submitButton({
                    className: "",
                    text: "Создать",
                }),
            },
        }),
    },
})

export default addChatPopup
