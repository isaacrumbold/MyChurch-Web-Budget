"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = exports.User = void 0;
//User class: this is used to store a single user's information. 
//It is stored in local storage as a JSON object.
var User = /** @class */ (function () {
    function User(user, pass, church) {
        this.username = user;
        this.password = pass;
        this.churchname = church;
    }
    Object.defineProperty(User.prototype, "setpassword", {
        set: function (thepassword) {
            this.password = thepassword;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getpassword", {
        get: function () {
            return this.password;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getusername", {
        get: function () {
            return this.username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setchurchname", {
        set: function (thechurch) {
            this.churchname = thechurch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getchurchname", {
        get: function () {
            return this.churchname;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
//Budget class: this is used to store a single budget's information.
//It is stored in local storage as a JSON object.
var Budget = /** @class */ (function () {
    function Budget(name, amount) {
        this.budgetname = name;
        this.budgetamount = amount;
        this.spent = 0;
    }
    Object.defineProperty(Budget.prototype, "getbudgetname", {
        get: function () {
            return this.budgetname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Budget.prototype, "setamount", {
        set: function (theamount) {
            this.budgetamount = theamount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Budget.prototype, "getamount", {
        get: function () {
            return this.budgetamount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Budget.prototype, "setspent", {
        set: function (amount) {
            this.spent = amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Budget.prototype, "getspent", {
        get: function () {
            return this.spent;
        },
        enumerable: false,
        configurable: true
    });
    Budget.prototype.amountremaining = function () {
        var remaining = this.budgetamount - this.spent;
        return remaining;
    };
    return Budget;
}());
exports.Budget = Budget;
