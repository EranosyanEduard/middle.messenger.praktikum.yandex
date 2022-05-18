import {IApiClient, TErrorResponse} from "~/src/core/api-client"
import {Router} from "~/src/core/router"
import {routeNames} from "~/src/router"
import store from "~/src/stores"
import {is} from "~/src/utils"
import {TRecord} from "~/src/models/common"

abstract class Controller<A extends IApiClient> {
    protected constructor(protected readonly apiClient: A) {}

    protected get router() {
        return Router.invoke()
    }

    protected openErrorPage(err: unknown) {
        if (is.str(err)) {
            let exception: TRecord
            try {
                const parsedError = JSON.parse(err)
                if (is.obj(parsedError)) {
                    exception = parsedError as TRecord
                } else {
                    exception = {}
                }
            } catch (e) {
                exception = {}
            }

            if (is.bool(exception.isOK) && !exception.isOK) {
                const {
                    data: {error = "Неожиданная ошибка"},
                    status: {code = NaN},
                } = exception as TErrorResponse

                store.exception.state.set("error", {
                    code,
                    text: error,
                })
            }
        }

        this.router.go({name: routeNames.error})
    }
}

export default Controller
