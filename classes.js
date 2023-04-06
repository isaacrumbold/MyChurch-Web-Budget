//User class: this is used to store a single user's information. 
//It is stored in local storage as a JSON object.
export class User {
    constructor(user, pass, church) {
        this.username = user;
        this.password = pass;
        this.churchname = church;
    }
    set setpassword(thepassword) {
        this.password = thepassword;
    }
    get getpassword() {
        return this.password;
    }
    get getusername() {
        return this.username;
    }
    set setchurchname(thechurch) {
        this.churchname = thechurch;
    }
    get getchurchname() {
        return this.churchname;
    }
}
//Budget class: this is used to store a single budget's information.
//It is stored in local storage as a JSON object.
export class Budget {
    constructor(name, amount) {
        this.budgetname = name;
        this.budgetamount = amount;
        this.spent = 0;
    }
    get getbudgetname() {
        return this.budgetname;
    }
    set setamount(theamount) {
        this.budgetamount = theamount;
    }
    get getamount() {
        return this.budgetamount;
    }
    set setspent(amount) {
        this.spent = amount;
    }
    get getspent() {
        return this.spent;
    }
    amountremaining() {
        const remaining = this.budgetamount - this.spent;
        return remaining;
    }
}
