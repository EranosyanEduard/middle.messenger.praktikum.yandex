import {View} from "~/src/core/view"
import {TOptions} from "./models"

function uiLayout(opts: TOptions) {
    return View.new({
        name: "UiLayout",
        template: `
            <main class="app__main ui">
                <section :class="asideClassName" class="ui__area">
                    <AsideSection></AsideSection>
                </section>
                <section :class="mainClassName" class="ui__area">
                    <MainSection></MainSection>
                </section>
                <OptionalSection></OptionalSection>
            </main>
        `,
        ...opts,
    })
}

export default uiLayout
