import {EPropActions} from "~/src/core/component/models"

class UnsupportedOperationException extends Error {
    constructor(operation: EPropActions, reason = "") {
        const title = `Невозможно выполнить операцию "${operation}"`
        const message = reason.length > 0 ? `${title}. Причина: ${reason}` : title
        super(message)
        this.name = UnsupportedOperationException.name
    }
}

export default UnsupportedOperationException
