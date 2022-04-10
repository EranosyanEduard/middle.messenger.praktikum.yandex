import Compiler from "../../../../plugins/template-engine/Compiler"
import { errorComp } from "../../../../components"

export default Compiler.compile(errorComp, {
    $data: {
        error: {
            className: "m_all_auto",
            code: 404,
            msg: "Страница не найдена",
        },
    },
})
