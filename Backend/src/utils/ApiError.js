class ApiError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error", data = null, errors = [], stack = "") {
        super()
        this.success = false
        this.statusCode = statusCode,
        this.message = message
        this.data = data
        this.errors = errors
        if (stack) {
            this.stack = stack
        }
        Error.captureStackTrace(this, this.constructor)
    }

}

export default ApiError