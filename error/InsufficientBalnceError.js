const BankAppError = require("./BankAppError");
const { StatusCodes } = require('http-status-codes')
class InsufficientBalnceError extends BankAppError{
    constructor(specificMessage) {
        super("Check your sent parameters",
            "insufficient balance",
            StatusCodes.BAD_REQUEST,
            specificMessage
        )

    }

}
module.exports=InsufficientBalnceError