import {TemplateFactory} from "../../core/template-engine"
import SOURCE from "./source"
import anchorCons from "../anchor"

export default TemplateFactory.getCons(SOURCE, {
    components: {
        anchor: anchorCons.instance.addContext({
            data: {
                className: "",
                ref: "../index.html",
                text: "Назад",
            },
        }),
    },
    options: {
        bemBlock: "error",
    },
})
