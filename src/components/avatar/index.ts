import {Component, TComponentOptions} from "~/src/core/component"
import {TProps} from "./models"

class Avatar extends Component<TProps> {
    constructor(options: Pick<TComponentOptions<TProps>, "props">) {
        super({
            template: `
                <div class="& {{avatarClassName}}">
                    <i data-alt="Изображение пользователя" class="&__img {{imgClassName}}"></i>
                </div>
            `,
            props: options.props,
        })
    }
}

export default Avatar
