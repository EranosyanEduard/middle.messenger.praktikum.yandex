export default `
    <main class="& {{classes.box}}">
        <section class="&__area &__area_id_aside {{classes.aside}}">
            <slot name="aside" />
        </section>

        <section class="&__area {{classes.main}}">
            <slot name="main" />
        </section>
    </main>
`
