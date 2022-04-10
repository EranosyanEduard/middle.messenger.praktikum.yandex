export default `
    <main class="ui {{ui.classNames.container}}">
        <section class="ui__area ui__area_id_aside {{ui.classNames.aside}}">
            <slot name="ui.aside" />
        </section>
        <section class="ui__area {{ui.classNames.main}}">
            <slot name="ui.main" />
        </section>
    </main>
`
