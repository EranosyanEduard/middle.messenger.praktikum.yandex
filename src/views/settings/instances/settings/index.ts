import {settings} from "~/src/components"
import {details, navMenu} from "../../components"

export default settings({
    props: {
        cardClassName: "m_xy_auto",
        footClassName: "",
        nameClassName: "",
    },
    views: {
        bodySection: details(),
        footSection: navMenu(),
    },
})
