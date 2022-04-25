import {Component, TComponentOpts} from "~/src/core/component"
import {TProps} from "./models"

class Chats extends Component<TProps> {
    constructor(options: Pick<TComponentOpts<TProps>, "props">) {
        super({
            template: `
                <ul class="&">
                    <for each="chats">
                        <li class="&__item">
                            <img
                                src="#"
                                alt="Аватар пользователя"
                                class="&__img">
                            <span class="&__name">Имя пользователя</span>
                            <span class="&__date">Дата / Время</span>
                        </li>
                    </for>
                </ul>
            `,
            props: options.props,
        })
    }
}

export default Chats
