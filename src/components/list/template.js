export default `
    <ul class="list">
        <for data="{{list.data}}" it="{{list.it}}">
            <li class="list__item {{list.classNames.item}}"><slot name="list.item" /></li>
        </for>
    </ul>
`
