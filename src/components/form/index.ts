import {View} from "~/src/core/view"
import {TOptions} from "./models"

function form(opts: TOptions) {
    return View.new({
        name: "Form",
        template: `
            <form class="form" :class="formClassName" @submit="onSubmit">
                <fieldset class="form__fieldset">
                    <div class="form__content">
                        <div class="form__head">
                            <legend class="form__legend" :text="legend"></legend>
                        </div>
                        <div class="form__body"><BodySection></BodySection></div>
                        <div class="form__foot">
                            <SubmitButton></SubmitButton>
                            <RedirectButton></RedirectButton>
                        </div>
                    </div>
                </fieldset>
            </form>
        `,
        ...opts,
    })
}

export default form
