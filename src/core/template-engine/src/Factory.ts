import Template from "./Template"
import {TContext, TFactory} from "../models"

class TemplateFactory {
    /**
     * Получить фабрику экземпляров класса Template.
     * @param source исходный код шаблона разметки.
     * @param context контекст, использующийся при "компиляции" source.
     */
    static getCons(source: string, context: TContext<Template> | null = null): TFactory<Template> {
        return {
            get instance() {
                return new Template(source, context)
            },
        }
    }
}

export default TemplateFactory
