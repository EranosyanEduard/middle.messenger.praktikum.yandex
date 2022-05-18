import {TypeName} from "../models"

const TYPE_LIST: Lowercase<TypeName>[] = [
    "array",
    "boolean",
    "character",
    "float",
    "function",
    "integer",
    "null",
    "number",
    "object",
    "string",
    "undefined",
]

const IDENTITY = <Record<Lowercase<TypeName>, number>>{}

const TYPE_IDENTIFIERS = TYPE_LIST.reduce((acc, type, index) => {
    acc[type] = index
    return acc
}, IDENTITY)

export default TYPE_IDENTIFIERS
