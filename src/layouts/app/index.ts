import {View, ViewOpts} from "~/src/core/view"

function appLayout(opts: Required<Pick<ViewOpts<never, never, never, "bodySection">, "views">>) {
    return View.new({
        name: "AppLayout",
        template: `
            <div class="app__main app__main_padding d_flex">
                <BodySection></BodySection>
            </div>
        `,
        ...opts,
    })
}

export default appLayout
