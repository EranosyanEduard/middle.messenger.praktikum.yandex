import {Router} from "~/src/core/router"
import {IApiClient} from "~/src/core/api-client"
import {routeNames} from "~/src/router"

abstract class Controller<A extends IApiClient> {
    protected constructor(protected readonly apiClient: A) {}

    protected get router() {
        return Router.invoke()
    }

    protected openErrorPage() {
        this.router.go({name: routeNames.error})
    }
}

export default Controller
