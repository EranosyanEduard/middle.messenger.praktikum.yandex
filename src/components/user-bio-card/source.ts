export default `
    <section class="& {{classes.card}}">
        <header class="&__head">
            <avatar-component />
            <h2 class="&__name {{classes.name}}">{{name}}</h2>
        </header>

        <main class="&__body">
            <slot name="body" />
        </main>

        <footer class="&__foot {{classes.foot}}">
            <slot name="foot" />
        </footer>
    </section>
`
