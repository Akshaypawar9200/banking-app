const{
    NotFoundError,
    UnauthorizedError,
    ValidationError
}=require('./error')
const InsufficientBalnceError = require('./error/InsufficientBalnceError')

class Account{
    static id=0
    constructor(bankId,name,accountBalance,transaction){
        this.bankId=bankId
        this.id=Account.id++,
        this.name=name,
        this.accountBalance=accountBalance
        this.transaction=transaction

    }

    static newAccount(id,name,balance,transaction){
        try{
            if(balance<1000){
                throw new InsufficientBalnceError("minimum balance require to create account is 1000")
            }
            if(typeof name!="string")
            {
                throw new ValidationError("invalid name")
            }
            if(typeof balance!="number"){
                throw new ValidationError("invalid balance")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid id")
            }
            return new Account(id,name,balance,transaction)
        }
        catch(error){
            return error
        }
        
           

    }

    getBalance(){
        return this.accountBalance
    }
    newDeposite(amount){
        try{
            if(typeof amount!="number"){
                throw new ValidationError("invalid amount")
            }
             return this.accountBalance+=amount
        }
        
    
    catch(error){
        return error
    }}

    newWithdraw(amount){
        try{
            if(typeof amount!="number"){
                throw new ValidationError("invalid amount ")
            }
            if(this.accountBalance>amount){
                if(this.accountBalance-amount>=1000){
                    let withdraw=this.accountBalance-amount
                    this.accountBalance=withdraw
                    console.log("sucess");
                    return withdraw
                }
                else{
                    console.log("unsucessful plz maintain minimum balance 1000");
                }
            }
        }
        catch(error){
            return error
        }
    }
    getTransaction(){
        return this.transaction
    }
}
module.exports=Account