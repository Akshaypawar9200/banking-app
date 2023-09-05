const{
    NotFoundError,
    UnauthorizedError,
    ValidationError
}=require('./error')
class Bank{
    static id=0
    
    constructor(bankName,abbr){
        this.id=Bank.id++,
        this.bankName=bankName,
        this.abbr=abbr
       
    }
    static newBank(name){
       try{ if(typeof name!="string"){
            throw new ValidationError("invalid bank name")
           
        }
        let bankObj=new Bank(name,Bank.abbreviateString(name))
        
        // console.log(Bank.allBank);
        return bankObj
        
    }

    catch(Error){
        return Error
    }
  

     
    }
    static abbreviateString(name) {
    
    const words = name.split(' ');
    let abbreviation = '';
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0) {
        abbreviation += word[0].toUpperCase();
      }
    }
    return abbreviation;
  }
  static findBank(id){
    for(let i=0;i<Bank.allBank.length;i++){
      if(Bank.allBank[i].id==id){
        return Bank.allBank[i]
      }
    }
    return null
  }

  updateBankName(newValue){
    try{if(typeof newValue!="string"){
      throw new ValidationError("invalid Bank name")
    }

    this.bankName=newValue

  
    this.abbr=Bank.abbreviateString(newValue)
    
  }
  catch(error){
    return error
  }
  }
  updateBank(parameter,newValue){
    try{
    switch(parameter){
      
      case "bankName":
          this.updateBankName(newValue)
          break
      
      default:
          throw new ValidationError("invalid parameter")
      
  }
}
catch(error){
  return error
}

  }

}
module.exports=Bank