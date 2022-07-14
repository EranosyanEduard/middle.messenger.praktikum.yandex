import {Checker} from "../../class"
import errorMessages from "../../utils"
import typeIDs from "../../../utils"

const checker = new Checker(Object.values(typeIDs), (type) => {
    switch (type) {
        case typeIDs.array:
            return (v) => Array.isArray(v)
        case typeIDs.character:
            return (v) => typeof v === "string" && v.length === 1
        case typeIDs.float:
            return (v) => typeof v === "number" && !Number.isInteger(v) && !Number.isNaN(v)
        case typeIDs.integer:
            return (v) => Number.isInteger(v)
        case typeIDs.null:
            return (v) => v === null
        case typeIDs.object:
            return (v) => typeof v === "object" && v !== null
        default:
            return (v) => {
                const typeId = Object.entries(typeIDs).find(([_type, id]) => id === type)
                if (typeId !== undefined) {
                    return typeof v === typeId[0]
                }
                throw new Error(errorMessages.unexpected)
            }
    }
})

export default checker
