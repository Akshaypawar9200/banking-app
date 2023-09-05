const{
    NotFoundError,
    UnauthorizedError,
    ValidationError
}=require('./error')
class Transaction{
    constructor(date,sendId,reciverId,amount,currentBalnce,type){
        this.date=date,
        this.sendId=sendId,
        this.reciverId=reciverId,
        this.amount=amount,
        this.currentBalnce=currentBalnce
        this.type=type
       
    }

    static newTransaction(date,sendId,reciverId,amount,currentBalnce,type){
       
            return new Transaction(date,sendId,reciverId,amount,currentBalnce,type)
        }
        getDate(){
            return this.date
        }
      
    }
    module.exports=Transaction


