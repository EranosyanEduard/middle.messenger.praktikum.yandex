import {TemplateFactory} from "../../core/template-engine"
import anchorCons from "../anchor"

const source = anchorCons.instance
    .addContext({
        data: {
            className: "&_icon &_icon_arrow-back &_icon_xl m_xy_auto",
            text: "",
        },
    })
    .compile()

export default TemplateFactory.getCons(source)
