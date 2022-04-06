import {Predicate} from "../../models"

export const enum Checkers {
    Empty = "empty",
    Type = "type",
}

type IsItEmpty = {
    arr: Predicate<unknown[]>

    obj: Predicate<Record<string, unknown>>

    str: Predicate<string>
}

type MethodName =
    | "arr"
    | "bool"
    | "char"
    | "err"
    | "falsy"
    | "fun"
    | "int"
    | "null"
    | "nullable"
    | "num"
    | "obj"
    | "re"
    | "str"
    | "truthy"
    | "undef"

type IsItType = Record<MethodName, Predicate>

export interface IIsIt extends IsItType {
    empty: IsItEmpty
}
