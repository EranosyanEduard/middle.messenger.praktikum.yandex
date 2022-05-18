import {IIs} from "./models"
import checkers from "../../checkers"
import typeIDs from "../../utils"

class Is implements IIs {
    empty = {
        arr(v: unknown[]) {
            return checkers.empty.get(typeIDs.array)(v)
        },
        obj(v: Record<string, unknown>) {
            return checkers.empty.get(typeIDs.object)(v)
        },
        str(v: string) {
            return checkers.empty.get(typeIDs.string)(v)
        },
    }

    arr(v: unknown): v is unknown[] {
        return checkers.type.get(typeIDs.array)(v)
    }

    bool(v: unknown): v is boolean {
        return checkers.type.get(typeIDs.boolean)(v)
    }

    char(v: unknown): v is string {
        return checkers.type.get(typeIDs.character)(v)
    }

    float(v: unknown): v is number {
        return checkers.type.get(typeIDs.float)(v)
    }

    fun(v: unknown): v is CallableFunction {
        return checkers.type.get(typeIDs.function)(v)
    }

    int(v: unknown): v is number {
        return checkers.type.get(typeIDs.integer)(v)
    }

    null(v: unknown): v is null {
        return checkers.type.get(typeIDs.null)(v)
    }

    num(v: unknown): v is number {
        return checkers.type.get(typeIDs.number)(v)
    }

    obj(v: unknown): v is object {
        return checkers.type.get(typeIDs.object)(v)
    }

    str(v: unknown): v is string {
        return checkers.type.get(typeIDs.string)(v)
    }

    undef(v: unknown): v is undefined {
        return checkers.type.get(typeIDs.undefined)(v)
    }
}

export default Is
