export default `
    <div class="field {{field.classNames.container}}">
        <div class="field__head {{field.classNames.head}}">
            <label for="{{field.id}}" class="field__label {{field.classNames.label}}">
                {{field.label}}
            </label>
        </div>
        <div class="field__body">
            <input type="{{field.type}}" name="{{field.name}}" id="{{field.id}}" class="field__input">
        </div>
        <div class="field__foot">
            <span class="field__label field__label_type_error">{{field.error}}</span>
        </div>
    </div>
`
