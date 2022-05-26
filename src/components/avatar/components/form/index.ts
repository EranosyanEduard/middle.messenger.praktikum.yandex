import form from "../../../form"
import input from "../../../input"
import {avatarOptions, factory} from "../../../input/utils"
import stub from "../../../stub"
import submitButton from "../../../submit-button"

function changeAvatarForm(onSubmit: (field: ReturnType<typeof input>) => void) {
    const [avatarInput] = factory([avatarOptions])

    return form({
        meths: {
            async onSubmit(event: SubmitEvent) {
                event.preventDefault()
                await onSubmit(avatarInput)
            },
        },
        props: {
            formClassName: "",
            legend: "Изменить аватар",
        },
        views: {
            bodySection: avatarInput,
            redirectButton: stub,
            submitButton: submitButton({
                className: "",
                text: "Сохранить",
            }),
        },
    })
}

export default changeAvatarForm
