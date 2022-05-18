import {settings, stub} from "~/src/components"
import form from "../form"

export default settings({
    props: {
        cardClassName: "m_xy_auto",
        footClassName: "",
        nameClassName: "",
    },
    views: {
        bodySection: form,
        footSection: stub,
    },
})
