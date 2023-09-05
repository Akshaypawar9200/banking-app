const Bank=require('./Bank')
const User=require('./User')
// create admin
admin=User.newAdmin("akshay",23,"male")
// create user
User1=admin.newUser("om",23,"male")


// admin.updateUser(1,"age",22);
// console.log(User.AllUser)

admin.createBank("Bank Of Maharashtra");
admin.createBank("Bank Of India");
// console.log(Bank.allBank);

// update bank
// admin.updateBank(0,"bankName","State Bank India")
// console.log(User.AllBank);


// creating account
User1.createAccount(0,10000)
User1.createAccount(0,4000)

User1.createAccount(1,2000)

// User1.deposite(0,1,100)
// User1.withdrawAmount(0,0,100)
// console.log(User1.getAllaccount());


// transfer amount from one account to another
// console.log(User1.transferBalance(0,1,1000))




User1.deposite(0,100)
// console.log(User1.getAllaccount());
console.log(User1.netWorth(0));
// console.log(User1.accountBalance(1))
// console.log(User1.withdrawAmount(0,1,900))
// console.log(User1.allAccount)


// console.log(User1.getAccountTransaction(0,'4/9/2023','5/9/2023'))



