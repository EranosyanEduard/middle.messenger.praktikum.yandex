import {ObjMeths, StrMeths} from "~/src/utils"
import {EChars, TRecord} from "~/src/models/common"
import {
    EContextKeys,
    ERegExpKeys,
    TContext,
    TContextCategory,
    TRegExpReplacerKeys,
    TRegExpReplacers,
    TRegExpReplacerWrapper,
} from "../models"

class Template {
    /**
     * @description
     * Коллекция регулярных выражений.
     * @private
     */
    private static regExps = {
        [ERegExpKeys.Bem]: /class="(.*?)(?<amp>&)(.*?)"/gi,
        [ERegExpKeys.Comp]: /<(?<keys>[\w-]+?)-component \/>/gi,
        [ERegExpKeys.Data]: /{{(?<keys>.+?)}}/gi,
        [ERegExpKeys.Each]: /<for each="(?<keys>.+?)">(?<item>.+)<\/for>/gi,
        [ERegExpKeys.Slot]: /<slot name="(?<keys>.+?)" \/>/gi,
    }

    /**
     * @description
     * Коллекция обработчиков подстрок - совпадений с регулярными выражениями.
     * @private
     */
    private static regExpReplacers: TRegExpReplacers = {
        [ERegExpKeys.Bem]: (context, match, groups) => {
            const isStr = (arg: unknown): arg is string => typeof arg == "string"
            const amp = groups?.amp

            if (isStr(amp)) {
                const bemBlock = ObjMeths.getValOrElse(context, "bemBlock", () => null)
                if (isStr(bemBlock)) {
                    return match.replaceAll(amp, bemBlock)
                }
            }
            return match
        },
        [ERegExpKeys.Comp]: (context, match, groups) => {
            const keys = groups?.keys

            if (typeof keys == "string") {
                const trimmedKeys = keys.trim()
                const handledKeys = trimmedKeys.includes(EChars.Dash)
                    ? StrMeths.convertKebabCaseToCamelCase(trimmedKeys)
                    : trimmedKeys

                const temp = ObjMeths.getValOrElse(context, handledKeys, () => null)

                if (temp instanceof Template) {
                    return temp.compile()
                }
            }
            return match
        },
        [ERegExpKeys.Data]: (context, match, groups) => {
            const keys = groups?.keys

            return typeof keys == "string"
                ? (ObjMeths.getValOrElse(context, keys.trim(), () => match) as string)
                : match
        },
        [ERegExpKeys.Each]: (context, match, groups) => {
            const isStr = (arg: unknown): arg is string => typeof arg == "string"
            const keys = groups?.keys
            const item = groups?.item

            if (isStr(keys) && isStr(item)) {
                const arr = ObjMeths.getValOrElse(context, keys.trim(), () => null)
                if (Array.isArray(arr)) {
                    const re = Template.regExps[ERegExpKeys.Data]
                    return arr
                        .map((_, i) => item.replace(re, `{{${keys}.${i}.$1}}`))
                        .join(EChars.Empty)
                }
            }
            return match
        },
    }

    private contextList: Array<TContext<Template> | null>

    private source: string

    /**
     * Создать экземпляр класса Template.
     * @param source исходный код шаблона разметки.
     * @param context контекст, использующийся при "компиляции" source.
     */
    constructor(source: string, context: TContext<Template> | null) {
        this.source = source
        this.contextList = [context]
    }

    /**
     * Добавить дополнительный контекст, использующийся при компиляции шаблона.
     * @param context контекст, использующийся при "компиляции" шаблона.
     */
    addContext(context: TContext<Template>): Template {
        this.contextList.push(context)
        return this
    }

    /**
     * "Скомпилировать" исходный код шаблона в готовую html-разметку.
     */
    compile(): string {
        function isObj(arg: unknown): arg is TRecord {
            return typeof arg == "object" && arg != null && !Array.isArray(arg)
        }

        this.source = StrMeths.replaceSpaceChars(this.source)
        const contexts = this.contextList.filter(isObj)

        if (contexts.length) {
            const context = ObjMeths.zip<TContext<Template>>(contexts, true)

            this.useContext(context[EContextKeys.Slots], ERegExpKeys.Slot, ERegExpKeys.Data)
                .useContext(context[EContextKeys.Components], ERegExpKeys.Comp, ERegExpKeys.Comp)
                .useContext(context[EContextKeys.Data], ERegExpKeys.Each, ERegExpKeys.Each)
                .useContext(context[EContextKeys.Data], ERegExpKeys.Data, ERegExpKeys.Data)
                .useContext(context[EContextKeys.Options], ERegExpKeys.Bem, ERegExpKeys.Bem)
        }

        return this.source
    }

    /**
     * Обойти с помощью метода регулярного выражения exec исходный код шаблона
     * разметки и внести в него изменения, заменив все совпадения вызовом аргумента fun.
     * @param regExp регулярное выражение.
     * @param replacer обработчик совпадения подстроки с регулярным выражением.
     * @private
     */
    private execute(regExp: RegExp, replacer: TRegExpReplacerWrapper): Template {
        const re = regExp
        let currentMatch: RegExpExecArray | null

        while ((currentMatch = re.exec(this.source))) {
            if (currentMatch) {
                const [match] = currentMatch
                const {groups, index} = currentMatch
                const val = replacer(match, groups, currentMatch)

                re.lastIndex = index

                if (match === val) {
                    re.lastIndex += 1
                } else {
                    this.source = this.source.replace(match, val)
                }
            }
        }

        return this
    }

    /**
     * Использовать контекст в исходном коде шаблона.
     * @param context определенный раздел контекста.
     * @param regExpKey ключ, использующийся для выбора регулярного выражения.
     * @param regExpReplacerKey ключ, использующийся для выбора обработчика подстроки, совпавшей с
     * регулярным выражением.
     * @private
     */
    private useContext(
        context: TContextCategory<Template> | undefined,
        regExpKey: ERegExpKeys,
        regExpReplacerKey: TRegExpReplacerKeys,
    ): Template {
        function isObj(arg: unknown): arg is TRecord {
            return typeof arg == "object" && arg != null && !Array.isArray(arg)
        }

        if (isObj(context)) {
            const re = Template.regExps[regExpKey]
            const replacer = Template.regExpReplacers[regExpReplacerKey]

            this.execute(re, (str, groups, match) => replacer(context, str, groups, match))
        }

        return this
    }
}

export default Template
