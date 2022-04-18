class ArrMeths {
    /**
     * Определить является ли каждый элемент массива уникальным.
     * @param arr массив произвольных элементов.
     */
    static isSet(arr: unknown[]): boolean {
        return arr.length === new Set(arr).size
    }
}

export default ArrMeths
