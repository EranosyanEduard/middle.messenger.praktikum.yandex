import {form, stub} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, submitButton} from "./instances"

export default form({
    meths: {
        async onSubmit(event: SubmitEvent) {
            event.preventDefault()
            await controller.user.changePassword(fieldset)
        },
    },
    props: {
        formClassName: "form_bg_none",
        legend: "",
    },
    views: {
        bodySection: fieldset,
        redirectButton: stub,
        submitButton,
    },
})
