import Checker from "../checker/Checker"
import {Types, Value} from "./model"

export default new Checker<Types, Value>(Object.values(Types), (type) => (val) => {
    switch (type) {
        case Types.Object:
            return Object.keys(val).length === 0
        default:
            return val.length === 0
    }
})
