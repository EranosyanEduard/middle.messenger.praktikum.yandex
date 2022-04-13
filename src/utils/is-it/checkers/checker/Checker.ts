import {Predicate} from "../../models"

class Checker<T, V> {
    private readonly checkers: Map<T, Predicate<V>>

    constructor(types: Array<T>, getter: (type: T) => Predicate<V>) {
        this.checkers = new Map(types.map((type) => [type, getter(type)]))
    }

    get(type: T): Predicate<V> {
        return this.checkers.get(type) as Predicate<V>
    }
}

export default Checker
