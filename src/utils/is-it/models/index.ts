/**
 * @description Тип, описывающий предикат, т.е. функцию, принимающую аргумент
 * типа A и возвращающую логическое значение.
 */
export type Predicate<A = unknown> = (arg: A) => boolean

/**
 * @description Тип, описывающий названия типов данных.
 */
export type TypeName =
    | "ARRAY"
    | "BOOLEAN"
    | "CHARACTER"
    | "FLOAT"
    | "FUNCTION"
    | "INTEGER"
    | "NULL"
    | "NUMBER"
    | "OBJECT"
    | "STRING"
    | "UNDEFINED"
