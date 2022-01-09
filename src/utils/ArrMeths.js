class ArrMeths {
    /**
     * Объединить элементы массива в строку.
     * @param {array} stringList массив элементов.
     * @param {string} separator разделитель между элементами массива.
     * @param {string} prefix начало строки.
     * @param {string} postfix конец строки.
     * @returns {string}
     */
    static joinToString(stringList, separator = " ", prefix = "", postfix = "") {
        return `${prefix}${stringList.join(separator)}${postfix}`
    }
}

export default ArrMeths
