class ObjMeths {
    /**
     * Извлечь значение ключа keyPath из объекта obj, а в случае его отсутствия
     * вызвать функцию defaultVal.
     * @param {object} obj объект из которого необходимо извлечь значение.
     * @param {string} chainOfKeys ключ целевого значения.
     * @param defaultVal функция, которая вызывается при отсутствии keyPath в obj.
     * @returns {*}
     */
    static getValOrElse(obj, chainOfKeys, defaultVal = (key, path) => path) {
        const keyList = chainOfKeys.split(".")
        let result = obj

        for (const key of keyList) {
            result = result[key]
            if (result === undefined) {
                return defaultVal(key, chainOfKeys)
            }
        }
        return result
    }
}

export default ObjMeths
