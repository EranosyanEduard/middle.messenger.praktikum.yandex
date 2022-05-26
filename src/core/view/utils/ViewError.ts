class ViewError extends Error {
    constructor(message: string) {
        super(message)
        this.name = ViewError.name
    }
}

export default ViewError
