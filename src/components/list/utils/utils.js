import Compiler from "../../../plugins/template-engine/Compiler"
import listComp from "../index"
import { ArrMeths, StrMeths } from "../../../utils"

function createComp(comp, compKey, opts = {}) {
    const { arrKey = "items", itemClassName = "", itKey = "$it", useSeparator = true } = opts

    return Compiler.compile(listComp, {
        $data: {
            list: {
                classNames: {
                    item: ArrMeths.joinToString([
                        itemClassName,
                        useSeparator ? "list__item_with_separator" : "",
                    ]),
                },
                data: arrKey,
                it: itKey,
            },
        },
        $slots: {
            list: {
                item: StrMeths.replacePattern(comp, compKey, itKey, "gi", "", "\\."),
            },
        },
    })
}

export default { createComp }
