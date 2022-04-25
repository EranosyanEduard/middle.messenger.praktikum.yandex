import {Form, Stub} from "~/src/components"
import controller from "~/src/controllers"
import {fieldset, submitBtn} from "./instances"

export default new Form({
    components: {
        body: fieldset,
        redirectRef: new Stub(),
        submitBtn,
    },
    emits: {
        async onSubmit(event) {
            event.preventDefault()
            await controller.user.changeUser(fieldset)
        },
    },
    props: {
        bemBlock: "form",
        contentClassName: "&__content_without_head",
        formClassName: "&_bg_none",
        headClassName: "d_none",
        legend: "",
    },
})
