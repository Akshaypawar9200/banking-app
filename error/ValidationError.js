const BankAppError = require("./BankAppError");
const { StatusCodes } = require('http-status-codes')
class ValidationError extends BankAppError{
    constructor(specificMessage) {
        super("Check your sent parameters",
            "Validation Error ",
            StatusCodes.BAD_REQUEST,
            specificMessage
        )

    }

}
module.exports=ValidationError