import appLayoutCons from "../../layouts/app"
import {formCons} from "../../components"
import {SIGN_IN_FORM_CONTEXT} from "../../components/form/utils"

const viewTemp = appLayoutCons.instance.addContext({
    data: {
        className: "d_flex",
    },
    slots: {
        body: formCons.instance.addContext(SIGN_IN_FORM_CONTEXT).compile(),
    },
})

export default viewTemp.compile()
