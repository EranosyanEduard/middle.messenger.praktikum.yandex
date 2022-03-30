export default `
    <form class="& {{classes.form}}">
        <fieldset class="&__fieldset">
            <div class="&__content {{classes.content}}">
                <div class="&__head {{classes.head}}">
                    <legend class="&__legend">{{legend}}</legend>
                </div>

                <div class="&__body">
                    <for each="inputs">
                        <field-component />
                    </for>
                </div>

                <div class="&__foot">
                    <submit-btn-component />
                    <redirect-ref-component />
                </div>
            </div>
        </fieldset>
    </form>
`
