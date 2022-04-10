export default `
    <div class="error {{error.className}}">
        <span class="error__code">{{error.code}}</span>
        <span class="error__msg">{{error.msg}}</span>
        <slot name="error.end" />
    </div>
`
