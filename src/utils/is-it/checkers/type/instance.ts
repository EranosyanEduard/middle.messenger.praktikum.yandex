import Checker from "../checker/Checker"
import {Types, Value} from "./model"

export default new Checker<Types, Value>(Object.values(Types), (type) => (val) => {
    switch (type) {
        case Types.Array:
            return Array.isArray(val)
        case Types.Character:
            return typeof val == "string" && val.length === 1
        case Types.Error:
            return typeof val == "object" && val instanceof Error
        case Types.Falsy:
            return !val
        case Types.Integer:
            return typeof val == "number" && Number.isInteger(val)
        case Types.Null:
            return val == null
        case Types.Nullable:
            return val == null || typeof val === "undefined"
        case Types.Object:
            return typeof val == "object" && !Array.isArray(val) && val != null
        case Types.RegExp:
            return typeof val == "object" && val instanceof RegExp
        case Types.Truthy:
            return !!val
        default:
            return typeof val === type
    }
})
