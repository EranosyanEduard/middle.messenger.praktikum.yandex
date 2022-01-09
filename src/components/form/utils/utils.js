import is from "is_js"
import Compiler from "../../../plugins/template-engine/Compiler"
import formComp from "../index"
import inputHelpers from "../../input/utils"

const { fieldList } = inputHelpers.constants

function createComp(comp, opts = {}) {
    const {
        actionType = "",
        anchor = { className: "d_none" },
        classNames = {},
        inputKeyList = [],
        legend = "",
        notBackground = false,
        notHead = false,
        submitBtnText = "Отправить",
    } = opts

    const items = inputKeyList.reduce((acc, it) => {
        if (it in fieldList) {
            return [...acc, fieldList[it]]
        }
        return acc
    }, [])

    if (is.not.empty(actionType)) {
        classNames.container = `${classNames.container} form_action_${actionType}`
    }

    if (notBackground) {
        classNames.container = "form_bg_none"
    }

    if (notHead) {
        classNames.head = "d_none"
    }

    return Compiler.compile(formComp, {
        $data: {
            anchor,
            button: { text: submitBtnText },
            form: {
                classNames,
                legend,
            },
            items,
        },
        $slots: {
            form: {
                body: comp,
            },
        },
    })
}

export default { createComp }
