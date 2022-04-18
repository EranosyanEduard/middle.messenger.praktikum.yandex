import {EPropActions} from "~/src/core/component/models"

class UnsupportedOperationException extends Error {
    constructor(operation: EPropActions, reason = "") {
        const title = `Невозможно выполнить операцию "${operation}"`
        let msg: string

        if (reason.length > 0) {
            msg = `${title}. Причина: ${reason}`
        } else {
            msg = title
        }

        super(msg)
        this.name = UnsupportedOperationException.name
    }
}

export default UnsupportedOperationException
