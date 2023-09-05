const BankAppError=require('./BankAppError')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends BankAppError {
    constructor(specificMessage) {
        super("Record Not FOund",
            "Not FOund Error",
            StatusCodes.NOT_FOUND, specificMessage)
    }
}
module.exports = NotFoundError