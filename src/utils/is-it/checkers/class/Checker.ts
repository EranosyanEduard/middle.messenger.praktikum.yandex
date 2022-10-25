import {IChecker} from "./models"
import {Predicate} from "../../models"

class Checker<T, V> implements IChecker<T, V> {
    /**
     * @description Словарь, содержащий функции проверки.
     * @private
     */
    private readonly checkers: Map<T, Predicate<V>>

    constructor(typeList: T[], getChecker: (type: T) => Predicate<V>) {
        this.checkers = new Map(typeList.map((type) => [type, getChecker(type)]))
    }

    get(type: T): Predicate<V> | never {
        const checker = this.checkers.get(type)
        if (checker !== undefined) {
            return checker
        }
        throw new Error(`Функция для проверки типа ${type} отсутствует`)
    }
}

export default Checker
