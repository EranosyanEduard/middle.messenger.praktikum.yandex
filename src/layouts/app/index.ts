import {TemplateFactory} from "../../core/template-engine"
import SOURCE from "./source"

export default TemplateFactory.getCons(SOURCE, {
    data: {
        className: "d_flex",
    },
    options: {
        bemBlock: "app",
    },
})
