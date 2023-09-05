
class BankAppError extends Error{
    constructor(message,name,statusCode,specificMessage){
        super(message)
        this.name=name,
        this.statusCode=statusCode,
        this.specificMessage=specificMessage


    }
}
module.exports=BankAppError