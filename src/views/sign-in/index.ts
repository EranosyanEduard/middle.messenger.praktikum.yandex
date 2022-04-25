import {AppLayout} from "~/src/layouts"
import {Form} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, redirectRef, submitBtn} from "./instances"

class SignInPage extends AppLayout {
    constructor() {
        super({
            components: {
                body: new Form({
                    components: {
                        body: fieldset,
                        redirectRef,
                        submitBtn,
                    },
                    emits: {
                        async onSubmit(event) {
                            event.preventDefault()
                            await controller.auth.signIn(fieldset)
                        },
                    },
                    props: {
                        bemBlock: "form",
                        contentClassName: "",
                        formClassName: "form_action_sign-in box-shadow m_xy_auto",
                        headClassName: "",
                        legend: "Войти в приложение",
                    },
                }),
            },
        })
    }
}

export default SignInPage
