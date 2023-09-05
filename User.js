const{
    NotFoundError,
    UnauthorizedError,
    ValidationError
}=require('./error')
const Bank=require('./Bank')
const Account=require('./Account')
const Transaction=require('./Transaction')
class User{
    static id=0
    static AllUser=[]
    static AllBank=[]
    constructor(name,age,gender,isAdmin,allAccount){
        this.id=User.id++
        this.name=name,
        this.age=age,
        this.gender=gender,
        this.isAdmin=isAdmin
        this.allAccount=[];

    }
    // create admin
    static newAdmin(name,age,gender){
        try{
            if(typeof name!="string"){
                throw new ValidationError("invalid firstname")
            }
            if(typeof age!="number"){
                throw new ValidationError("invalid age")

            }
            if(typeof gender!="string"){
                throw new ValidationError("invalid gender")
            }
            return new User(name,age,gender,true,null)
        }
        catch(Error){
            return Error
        }

    }
    // create user
    newUser(name,age,gender){
        try{
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof name!="string"){
                throw new ValidationError("invalid firstname")
            }
            if(typeof age!="number"){
                throw new ValidationError("invalid age")

            }
            if(typeof gender!="string"){
                throw new ValidationError("invalid gender")
            }
            let newUser=new User(name,age,gender,false,[])
            User.AllUser.push(newUser)
            return newUser
        }
        catch(Error){
            return Error
        }

    }
    static findUser(id){
        for(let i=0;i<User.AllUser.length;i++){
            if(User.AllUser[i].id==id){
                return User.AllUser[i]
            }
        }
        return null
    }
    updateName(newValue){
        try{
            if(typeof newValue!="string"){
                throw new ValidationError("invalid name parameter")
            }
        this.name=newValue
        }
        catch(Error){
            return Error
        }

    }
    updateAge(newValue){
        try{
            if(typeof newValue!="number"){
                throw new ValidationError("invalid age parameter")
            }
            this.age=newValue
       
        }
        catch(Error){
            return Error
        }
        

    }
    updateGender(newValue){
        try{
            if(typeof newValue!="string"){
                throw new ValidationError("invalid name parameter")
            }
        this.gender=newValue
        }
        catch(Error){
            return Error
        }

    }
    updateUser(id,parameters,newValue){
        try{
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid id")
            }
            if(typeof parameters!="string"){
                throw new ValidationError("invalid parameter")
            }
            let userToBeupdate=User.findUser(id)
            if(userToBeupdate===null){
                throw new NotFoundError("user not found")
            }
            switch(parameters){
                case "name":
                    userToBeupdate.updateName(newValue)
                    break
                case "age":
                    userToBeupdate.updateAge(newValue)
                    break
                case "gender":
                    userToBeupdate.updateGender(newValue)
                    break
                default:
                    throw new ValidationError("invalid parameter")
            }
        }
        catch(Error){
            return Error
        }

    }
    createBank(name){
        try{
            if(!this.isAdmin){
            throw new UnauthorizedError("you are not admin")
        }
        if(typeof name!="string"){
            throw new ValidationError("invalid bankname")
        }
        let newBank=Bank.newBank(name)
        User.AllBank.push(newBank)
        return newBank

    }
        catch(Error){
            return Error
        }
        
        


    }
    static findBank(id){
        try{
            for(let i=0;i<User.AllBank.length;i++){
                if(User.AllBank[i].id==id){
                    return User.AllBank[i]
                }
            }
            return null
        }
        catch(error){
            return error
        }
    }
   
    updateBank(id,parameter,newValue){
        try{
            if(!this.isAdmin){
                throw new UnauthorizedError("you are not admin")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid id")
            }
            if(typeof parameter!="string"){
                throw new ValidationError("invalid parameter")
            }
            let bankToBeupdate=User.findBank(id)
            if(bankToBeupdate===null){
                throw new NotFoundError("user not found")
            }
            return bankToBeupdate.updateBank(parameter,newValue)
            
        }
        catch(Error){
            return Error
        }

    }

    createAccount(id,balance){
        try{
            if(this.isAdmin){
                throw new ValidationError("admin cannot create account")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid bank id")
            }
            if(typeof balance!="number"){
                throw new ValidationError("invalid balance")
            }
            let accountToBecreate=User.findBank(id)
           
            
            if(accountToBecreate===null){
                throw new ValidationError("bank not found")
            }
            let date1=new Date()
            let newAccountObj=Account.newAccount(accountToBecreate.id,accountToBecreate.bankName,balance,[])
            this.allAccount.push(newAccountObj)
            return newAccountObj
        }
        catch(error){
            return error
        }
    }
    getAllaccount(){
        return this.allAccount
    }
    findAccount(bankId,id){
        for(let i=0;i<this.allAccount.length;i++){
            if(this.allAccount[i].id==id){
                if(this.allAccount[i].bankId==bankId){
                return this.allAccount[i]
            }}
        }
        return null

    }

    deposite(bankId,id,amount){
        try{
            if(this.isAdmin){
                throw new ValidationError("admin cannot deposite")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid number")
            }
            let depositeAc=this.findAccount(bankId,id)

           
            if(depositeAc===null){
                throw new NotFoundError("account not found")
            }
            let depositeObj=depositeAc.newDeposite(amount)
            console.log(depositeObj);
            let date2=new Date()
            let depositeTransaction=Transaction.newTransaction(date2.toLocaleDateString(),id,null,amount,depositeAc.getBalance(),"credit")
            let newPassBook=depositeAc.getTransaction()
    
            newPassBook.push(depositeTransaction)
            return depositeObj
        }
        catch(error){
            return error
        }

    }
accountBalance(id){
    try{
        if(this.isAdmin){
            throw new ValidationError("admin cannot gate account balance")
        }
        if(typeof id!="number")
        {
            throw new ValidationError("invalid id")
        }
        let totalAccountBalnce=this.findAccounts(id)
        
        if(totalAccountBalnce===null)
        {
            throw new NotFoundError("account not found")
        }
        let totalAccountBalnceObj=totalAccountBalnce.accountBalance
       
        return totalAccountBalnceObj

        
    }
    catch(error){
        return error
    }
}

    withdrawAmount(bankId,id,amount){
        try{
            if(this.isAdmin){
                throw new ValidationError("admin cannot withdraw amount")
            }
            if(typeof id!="number"){
                throw new ValidationError("invalid number")
            }
            let withdrawAc=this.findAccount(bankId,id)
           
            if(withdrawAc===null){
                throw new NotFoundError("account not found")
            }
            let withdrawObj=withdrawAc.newWithdraw(amount)
            let date3=new Date()
            let withdrawTransaction=Transaction.newTransaction(date3.toLocaleDateString(),id,null,amount,withdrawAc.getBalance(),"debit")
            let newPassBook=withdrawAc.getTransaction()
            newPassBook.push(withdrawTransaction)
            return withdrawObj
        }
        catch(error){
            return error
        }
    }
    findAccounts(id){
        for(let i=0;i<this.allAccount.length;i++){
            if(this.allAccount[i].id==id){
                return this.allAccount[i];
            }
        }
        return null
    }

    transferBalance(id1,id2,amount){
        try{
            if(this.isAdmin){
                throw new ValidationError("admin cannot cannot transfer money")
            }
            if(typeof id1!="number"){
                throw new ValidationError("invalid account1 id")
            }
            if(typeof id2!="number"){
                throw new ValidationError("invalid account2 id")
            }
            let transferBalanceObj1=this.findAccounts(id1)
            let transferBalanceObj2=this.findAccounts(id2)
            if(transferBalanceObj1===null){
                throw new NotFoundError("account not found")
            }
            if(transferBalanceObj2===null){
                throw new NotFoundError("account not found")
            }
            let senderObj= transferBalanceObj1.newWithdraw(amount)
            let receiver=transferBalanceObj2.newDeposite(senderObj)
            return "transfer sucess"
            

        }
        catch(error){
            return error
        }
    }
    findBankAccount(bankId){
        for(let i=0;i<this.allAccount.length;i++){
            if(this.allAccount[i].bankId==bankId){
                return this.allAccount[i]
            }
        }
        return null
    }
    

    netWorth(bankId) {
        try {
            if (typeof bankId !== "number") {
                throw new ValidationError("invalid id");
            }
    
            let bankIdObj = this.findBankAccount(bankId);
            if (bankIdObj === null) {
                throw new NotFoundError("bank not found");
            }
    
            let totalBalance = 0;
            for (let i = 0; i < this.allAccount.length; i++) {
                if (this.allAccount[i].bankId === bankId) {
                    totalBalance += this.allAccount[i].accountBalance;
                }
            }
    
            return totalBalance;
        } catch (error) {
            return error;
        }
    }

    getAccountTransaction(id,start,end){
        let currentTransaction=this.findAccounts(id)
        let newTransaction=currentTransaction.getTransaction()

        newTransaction.filter((data)=>{(data.getDate()>=start) && (data.getDate()<=end) })
        return newTransaction
    }
    
    }
  




module.exports=User



