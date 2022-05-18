import {Predicate} from "../../models"

type InterfaceName =
    | "arr"
    | "bool"
    | "char"
    | "float"
    | "fun"
    | "int"
    | "null"
    | "num"
    | "obj"
    | "str"
    | "undef"

export interface IIs extends Record<InterfaceName, Predicate> {
    empty: {
        arr: Predicate<[]>
        obj: Predicate<Record<string, unknown>>
        str: Predicate<string>
    }
}
