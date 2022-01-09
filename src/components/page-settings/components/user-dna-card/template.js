export default `
    <section class="user-dna-card {{userDnaCard.classNames.card}}">
        <header class="user-dna-card__head">
            <slot name="userDnaCard.avatar" />
            <h2 class="user-dna-card__name {{userDnaCard.classNames.name}}">{{userDnaCard.name}}</h2>
        </header>
        <main class="user-dna-card__body">
            <slot name="userDnaCard.body" />
        </main>
        <footer class="user-dna-card__foot {{userDnaCard.classNames.foot}}">
            <slot name="userDnaCard.foot" />
        </footer>
    </section>
`
