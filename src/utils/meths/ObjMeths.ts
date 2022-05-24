import {EChars, TRecord} from "../../models/common"

class ObjMeths {
    /**
     * Определить разницу в ключах между объектами.
     * @param objA произвольный объект.
     * @param objB произвольный объект.
     */
    static diffKeys(objA: TRecord, objB: TRecord): {key: string; objId: 0 | 1}[] {
        function go(keyListA: string[], keyListB: string[], objId: 0 | 1) {
            return keyListA
                .filter((key) => !keyListB.includes(key))
                .map((key) => ({
                    key,
                    objId,
                }))
        }

        const objAKeys = Object.keys(objA)
        const objBKeys = Object.keys(objB)

        return go(objAKeys, objBKeys, 0).concat(go(objBKeys, objAKeys, 1))
    }

    /**
     * Извлечь значение ключа keyPath из объекта obj, а в случае его отсутствия
     * вызвать функцию defaultVal.
     * @param obj объект из которого необходимо извлечь значение.
     * @param chainOfKeys ключ или цепочка ключей, разделенных точкой, как путь
     * к целевому значению.
     * @param defaultVal функция, которая вызывается при отсутствии chainOfKeys
     * в obj.
     */
    static getValOrElse(
        obj: TRecord,
        chainOfKeys: string,
        defaultVal = (_: string, path: string): string | unknown => path,
    ): string | unknown {
        const keyList = chainOfKeys.split(EChars.DOT)
        let result: unknown = obj

        for (const key of keyList) {
            let val: unknown
            if (typeof result == "object" && result != null) {
                if (Array.isArray(result)) {
                    val = result[parseInt(key, 10)]
                } else {
                    val = (result as TRecord)[key]
                }
            }
            if (typeof val == "undefined" || val === result) {
                return defaultVal(key, chainOfKeys)
            }
            result = val
        }

        return result
    }

    /**
     * Сравнить объекты [objA] и [objB] на основании их структуры.
     * @param objA произвольный объект.
     * @param objB произвольный объект.
     * @param compareOnlyStructure флаг, указывающий на необходимость сравнения
     * только структуры объектов, т.е. их ключей.
     * @returns
     */
    static isEqual(objA: TRecord, objB: TRecord, compareOnlyStructure = false): boolean {
        const keyList = Object.keys(objA)
        if (keyList.length === Object.keys(objB).length) {
            const isObj = (arg: unknown): arg is TRecord => typeof arg == "object" && arg != null
            return keyList.every((key) => {
                if (key in objB) {
                    const valA = objA[key]
                    const valB = objB[key]
                    if (isObj(valA) && isObj(valB)) {
                        return ObjMeths.isEqual(valA, valB, compareOnlyStructure)
                    }
                    return compareOnlyStructure || valA === valB
                }
                return false
            })
        }
        return false
    }

    /**
     * Скомбинировать объекты из массива objList в единственный объект.
     * @param objList список объектов.
     * @param canMergeObj флаг, указывающий на возможность слияния объектов в
     * случае, если в них содержатся одинаковые ключи, значениями которых
     * являются объекты.
     */
    static zip<R extends TRecord>(objList: TRecord[], canMergeObj = false): R {
        function isObj(arg: unknown): arg is TRecord {
            return typeof arg == "object" && arg != null && !Array.isArray(arg)
        }

        function isObjList(arg: unknown[]): arg is TRecord[] {
            return arg.every(isObj)
        }

        return objList.reduce((resultAcc, obj) => {
            const keyList = Object.keys(obj)
            return keyList.reduce((acc, key) => {
                if (!(key in acc)) {
                    acc[key] = obj[key]
                } else if (canMergeObj) {
                    const valList = [acc[key], obj[key]]
                    if (isObjList(valList)) {
                        acc[key] = this.zip(valList, true)
                    }
                }
                return acc
            }, resultAcc)
        }, {}) as R
    }
}

export default ObjMeths
