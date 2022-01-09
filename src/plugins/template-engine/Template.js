import is from "is_js"
import { ArrMeths, ObjMeths, StrMeths } from "../../utils"

class Template {
    static _contextKeys = {
        data: "$data",
        slot: "$slots",
    }

    static _regExpKeys = {
        data: "data",
        slot: "slot",
        loop: "loop",
    }

    static _regExps = {
        [Template._regExpKeys.data]: /{{(?<keys>.+?)}}/gi,
        [Template._regExpKeys.slot]: /<slot name="(?<keys>.+?)" \/>/gi,
        [Template._regExpKeys.loop]: /<for data="(?<keys>.+)" it="(?<it>.+?)">(?<item>.+)<\/for>/gi,
    }

    static _regExpReplacers = {
        base: (context) => (match) => {
            const { keys } = match.groups
            return ObjMeths.getValOrElse(context, keys.trim(), () => match[0])
        },
        [Template._regExpKeys.loop]: (context) => (match) => {
            const { it, item, keys } = match.groups
            const arr = ObjMeths.getValOrElse(context, keys.trim(), () => null)

            if (is.array(arr)) {
                const items = arr.map((_, i) => item.replaceAll(`${it}`, `${keys}.${i}`))
                return ArrMeths.joinToString(items, StrMeths.emptyStr)
            }

            return match[0]
        },
    }

    /**
     * Создать экземпляр класса Template.
     * @param {string} source исходный код шаблона разметки.
     * @param {object} context контекст, использующийся при "компиляции" source.
     */
    constructor(source, context = null) {
        this._source = source
        this._context = context
    }

    /**
     * Обойти с помощью метода регулярного выражения exec исходный код шаблона
     * разметки и внести в него изменения, заменив все совпадения вызовом аргумента fun.
     * @param {string} regExpKey ключ, использующийся для выбора регулярного выражения.
     * @param {function} replacer обработчик совпадения подстроки с регулярным выражением.
     * @returns {Template}
     * @private
     */
    _execute(regExpKey, replacer) {
        const re = Template._regExps[regExpKey]
        let currentMatch

        while ((currentMatch = re.exec(this._source))) {
            if (currentMatch) {
                const [match] = currentMatch
                const val = replacer(currentMatch)

                this._source = this._source.replace(match, val)

                re.lastIndex = currentMatch.index
                if (match === val) re.lastIndex += 1
            }
        }

        return this
    }

    /**
     * Использовать контекст в исходном коде шаблона.
     * @param {string} contextKey ключ, использующийся для выбора категории контекста.
     * @param {string} regExpKey ключ, использующийся для выбора регулярного выражения.
     * @param {string} replacerKey ключ, использующийся для выбора обработчика подстроки,
     * совпавшей с регулярным выражением.
     * @returns {Template}
     * @private
     */
    _useContext(contextKey, regExpKey, replacerKey = "base") {
        const context = is.object(this._context) ? this._context[contextKey] : null
        return is.object(context)
            ? this._execute(regExpKey, Template._regExpReplacers[replacerKey](context))
            : this
    }

    /**
     * "Скомпилировать" исходный код шаблона в готовую html-разметку.
     * @returns {string}
     */
    compile() {
        this._source = StrMeths.replaceSpaces(this._source, StrMeths.spaceChar)
        this._useContext(Template._contextKeys.slot, Template._regExpKeys.slot)
        this._useContext(
            Template._contextKeys.data,
            Template._regExpKeys.loop,
            Template._regExpKeys.loop,
        )
        this._useContext(Template._contextKeys.data, Template._regExpKeys.data)
        return this._source
    }
}

export default Template
