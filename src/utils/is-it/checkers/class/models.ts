import {Predicate} from "../../models"

export interface IChecker<T, V> {
    /**
     * @description Получить функцию для проверки значения типа V на
     * соответствие типу T.
     * @param type
     */
    get(type: T): Predicate<V> | never
}
