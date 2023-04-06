//User class: this is used to store a single user's information. 
//It is stored in local storage as a JSON object.
export class User{
    private username: string;
    private password: string;
    private churchname: string;
    
    constructor(user:string, pass:string, church:string){
        this.username = user;
        this.password = pass; 
        this.churchname = church;    
    }
    
    set setpassword(thepassword: string){
        this.password = thepassword;
    }
    get getpassword(){
        return this.password;
    }
    

    get getusername(){
        return this.username;
    }
    
    
    set setchurchname(thechurch: string){
        this.churchname = thechurch;
    }
    get getchurchname(){
        return this.churchname;
    }

        
}

//Budget class: this is used to store a single budget's information.
//It is stored in local storage as a JSON object.
 export class Budget{

    private budgetname: string;
    private budgetamount: number;
    private spent: number;

    constructor(name:string, amount: number){
         this.budgetname = name;
         this.budgetamount = amount;
         this.spent = 0;
     }

     get getbudgetname(){
        return this.budgetname
     }


     set setamount(theamount: number){
         this.budgetamount = theamount;
     } 
     get getamount(){
        return this.budgetamount;
     }


     set setspent(amount:number){
        this.spent = amount;
     }
     get getspent(){
        return this.spent;
     }

     amountremaining(){
        const remaining = this.budgetamount - this.spent;
        return remaining;
     }

     }
    
    
    
    
