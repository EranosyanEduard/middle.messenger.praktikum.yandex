export default `
    <form class="form {{form.classNames.container}}">
        <fieldset class="form__fieldset {{form.classNames.fieldset}}">
            <div class="form__field-group {{form.classNames.fieldGroup}}">
                <div class="form__head {{form.classNames.head}}">
                    <legend class="form__legend">{{form.legend}}</legend>
                </div>
                <div class="form__body">
                    <slot name="form.body" />
                </div>
                <div class="form__foot">
                    <slot name="form.footEnd" />
                </div>
            </div>
        </fieldset>
    </form>
`
