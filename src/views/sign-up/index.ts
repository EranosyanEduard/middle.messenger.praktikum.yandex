import {appLayout} from "~/src/layouts"
import {form} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, redirectButton, submitButton} from "./instances"

function signUpView() {
    return appLayout({
        views: {
            bodySection: form({
                meths: {
                    async onSubmit(event: SubmitEvent) {
                        event.preventDefault()
                        await controller.auth.signUp(fieldset)
                    },
                },
                props: {
                    formClassName: "box-shadow m_xy_auto",
                    legend: "Зарегистрироваться в приложение",
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

export default signUpView
