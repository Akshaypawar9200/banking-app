const BankAppError = require('./BankAppError')
const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends BankAppError {
    constructor(specificMessage) {
        super("Unauthorized Access",
            "Unauthorized Error",
            StatusCodes.UNAUTHORIZED,
            specificMessage
        )
    }
}
module.exports = UnauthorizedError