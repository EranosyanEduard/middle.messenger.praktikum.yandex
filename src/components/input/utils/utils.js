import Compiler from "../../../plugins/template-engine/Compiler"
import inputComp from "../index"

function setClassNames(classNames) {
    return Compiler.compile(inputComp, {
        $data: {
            field: {
                classNames,
            },
        },
    })
}

export default { setClassNames }
