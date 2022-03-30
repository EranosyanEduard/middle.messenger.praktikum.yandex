export default `
    <div class="& {{classes.fieldWrapper}}">
        <div class="&__head {{classes.head}}">
            <label for="{{id}}" class="&__label {{classes.label}}">{{label}}</label>
        </div>

        <div class="&__body">
            <input type="{{type}}" name="{{name}}" id="{{id}}" class="&__input">
        </div>

        <div class="&__foot">
            <span class="&__label &__label_type_error">{{error}}</span>
        </div>
    </div>
`
