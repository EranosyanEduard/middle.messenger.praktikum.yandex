import {appLayout} from "~/src/layouts"
import {form} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, redirectButton, submitButton} from "./instances"

function signInView() {
    return appLayout({
        views: {
            bodySection: form({
                meths: {
                    async onSubmit(event: SubmitEvent) {
                        event.preventDefault()
                        await controller.auth.signIn(fieldset)
                    },
                },
                props: {
                    formClassName: "form_action_sign-in box-shadow m_xy_auto",
                    legend: "Войти в приложение",
                },
                views: {
                    bodySection: fieldset,
                    redirectButton,
                    submitButton,
                },
            }),
        },
    })
}

export default signInView
