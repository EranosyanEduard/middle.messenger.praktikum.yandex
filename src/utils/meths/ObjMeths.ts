import {EChars, TRecord} from "../../models/common"

class ObjMeths {
    /**
     * Извлечь значение ключа keyPath из объекта obj, а в случае его отсутствия
     * вызвать функцию defaultVal.
     * @param obj объект из которого необходимо извлечь значение.
     * @param chainOfKeys ключ или цепочка ключей, разделенных точкой, как путь к целевому значению.
     * @param defaultVal функция, которая вызывается при отсутствии chainOfKeys в obj.
     */
    static getValOrElse(
        obj: TRecord,
        chainOfKeys: string,
        defaultVal = (key: string, path: string): string | unknown => path,
    ): string | unknown {
        const keyList = chainOfKeys.split(EChars.Dot)
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
     * Скомбинировать объекты из массива objList в единственный объект.
     * @param objList список объектов.
     * @param canMergeObj флаг, указывающий на возможность слияния объектов в случае, если в них
     * содержатся одинаковые ключи, значениями которых являются объекты.
     */
    static zip<R extends TRecord>(objList: TRecord[], canMergeObj = false): R {
        function isObjList(arg: unknown[]): arg is TRecord[] {
            return arg.every((it) => typeof it == "object" && it != null && !Array.isArray(it))
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
