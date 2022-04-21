import {AppLayout} from "~/src/layouts"
import {Form} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, redirectRef, submitBtn} from "./instances"

class SignUpPage extends AppLayout {
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
                            await controller.auth.signUp(fieldset)
                        },
                    },
                    props: {
                        bemBlock: "form",
                        contentClassName: "",
                        formClassName: "box-shadow m_xy_auto",
                        headClassName: "",
                        legend: "Зарегистрироваться в приложение",
                    },
                }),
            },
        })
    }
}

export default SignUpPage
