import {Checker} from "../../class"
import errorMessages from "../../utils"
import typeIDs from "../../../utils"

const allowedTypeIDs = Object.entries(typeIDs)
    .filter(([type]) => {
        switch (type as keyof typeof typeIDs) {
            case "array":
            case "object":
            case "string":
                return true
            default:
                return false
        }
    })
    .map(([_type, index]) => index)

const checker = new Checker<number, object | string>(allowedTypeIDs, (type) => {
    switch (type) {
        case typeIDs.array:
        case typeIDs.object:
        case typeIDs.string:
            return (v) =>
                Array.isArray(v) || typeof v === "string"
                    ? v.length === 0
                    : Object.keys(v).length === 0
        default:
            return (_) => {
                throw new Error(errorMessages.unexpected)
            }
    }
})

export default checker
