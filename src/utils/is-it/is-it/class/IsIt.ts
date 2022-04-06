import {
    emptyChecker,
    EmptyCheckerTypes,
    EmptyCheckerValue,
    typeChecker,
    TypeCheckerTypes,
    TypeCheckerValue,
} from "../../checkers"
import {Checkers, IIsIt} from "./model"

class IsIt implements IIsIt {
    empty = {
        arr: (v: unknown[]) => this.checkEmpty(EmptyCheckerTypes.Array, v),
        obj: (v: Record<string, unknown>) => this.checkEmpty(EmptyCheckerTypes.Object, v),
        str: (v: string) => this.checkEmpty(EmptyCheckerTypes.String, v),
    }

    private readonly checkers = {
        [Checkers.Empty]: emptyChecker,
        [Checkers.Type]: typeChecker,
    }

    private $not = false

    get not(): IsIt {
        this.$not = !this.$not
        return this
    }

    arr(v: unknown) {
        return this.checkType(TypeCheckerTypes.Array, v)
    }

    bool(v: unknown) {
        return this.checkType(TypeCheckerTypes.Boolean, v)
    }

    char(v: unknown) {
        return this.checkType(TypeCheckerTypes.Character, v)
    }

    err(v: unknown) {
        return this.checkType(TypeCheckerTypes.Error, v)
    }

    falsy(v: unknown) {
        return this.checkType(TypeCheckerTypes.Falsy, v)
    }

    fun(v: unknown) {
        return this.checkType(TypeCheckerTypes.Function, v)
    }

    int(v: unknown) {
        return this.checkType(TypeCheckerTypes.Integer, v)
    }

    null(v: unknown) {
        return this.checkType(TypeCheckerTypes.Null, v)
    }

    nullable(v: unknown) {
        return this.checkType(TypeCheckerTypes.Nullable, v)
    }

    num(v: unknown) {
        return this.checkType(TypeCheckerTypes.Number, v)
    }

    obj(v: unknown) {
        return this.checkType(TypeCheckerTypes.Object, v)
    }

    re(v: unknown): boolean {
        return this.checkType(TypeCheckerTypes.RegExp, v)
    }

    str(v: unknown) {
        return this.checkType(TypeCheckerTypes.String, v)
    }

    truthy(v: unknown) {
        return this.checkType(TypeCheckerTypes.Truthy, v)
    }

    undef(v: unknown) {
        return this.checkType(TypeCheckerTypes.Undefined, v)
    }

    private check(resultOfCheck: boolean): boolean {
        const result = this.$not ? !resultOfCheck : resultOfCheck
        this.$not = false
        return result
    }

    private checkEmpty(type: EmptyCheckerTypes, val: EmptyCheckerValue): boolean {
        return this.check(this.checkers[Checkers.Empty].get(type)(val))
    }

    private checkType(type: TypeCheckerTypes, val: TypeCheckerValue): boolean {
        return this.check(this.checkers[Checkers.Type].get(type)(val))
    }
}

export default IsIt
