"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var classes_js_1 = require("./classes.js");
//Event Listeners for buttons throughout the site
(_a = document.getElementById("createaccount")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", createAccount);
(_b = document.getElementById("submitlogin")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", login);
window.addEventListener("load", loaduserdata);
(_c = document.getElementById("createbudgetbtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", createbudget);
//validates account creation and creates account and stores information
function createAccount() {
    //assigns varibles to user input
    var username = document.getElementById("create-uname").value.toLowerCase();
    var password = document.getElementById("create-pass").value;
    var verify = document.getElementById("verify-pass").value;
    var church = document.getElementById("church-name").value;
    // checks if username already exists
    if (localStorage.getItem(username) !== null) {
        alert("Username already exists. Try a different Username.");
        throw new Error("Username already exists...");
    }
    //checks if passwords match
    if (password !== verify) {
        alert("Passwords don't match.");
        throw new Error("Passwards don't match...");
    }
    //if checks are met, creates account
    else {
        var user = new classes_js_1.User(username, password, church);
        var budgetlist = new Array();
        var listname = user.getusername + "budgets";
        localStorage.setItem(username, JSON.stringify(user));
        localStorage.setItem(listname, JSON.stringify(budgetlist));
        alert("Account created successfully!");
        window.open("login.html", "_self");
    }
}
//validates user log in information
function login() {
    //assigns varibles from user input
    var username = document.getElementById("uname").value.toLowerCase();
    var password = document.getElementById("password").value;
    //retreives user data from local storage
    if (localStorage.getItem(username) !== null) {
        var userinfo = JSON.parse(localStorage.getItem(username));
        var pass = userinfo.password;
        var uname = userinfo.username;
        //Validates log in
        if (username == uname && password == pass) {
            sessionStorage.setItem("useris", userinfo.username);
            alert("You have successfully loged into ".concat(uname, "!"));
            window.open("home.html", "_self");
        }
        else {
            alert("Invalid Password. Please try again");
        }
    }
    else {
        alert("Invalid Username or Password. Please try again");
    }
}
//loads user data if on home.html page
function loaduserdata() {
    var regex1 = /home/;
    var url = window.location.href;
    //uses regex to check if on home.html page
    if (regex1.test(url)) {
        var username = sessionStorage.getItem("useris");
        var userinfo = JSON.parse(localStorage.getItem(username));
        document.getElementById("hometitle").innerHTML = "".concat(userinfo.churchname, " Budget");
    }
    else {
        console.log('Something went wrong...');
    }
}
//displays and loads budgets for user
var displaystuff = function (name) {
    var element = document.getElementById(name);
    if (element.style.display == "none") {
        element.style.display = "flex";
    }
    else {
        element.style.display = "none";
    }
};
//create budget object in local storage
function createbudget() {
    //assigns varibles to a budget object
    var username = sessionStorage.getItem("useris");
    var userinfo = JSON.parse(localStorage.getItem(username));
    var bname = document.getElementById("create-bname").value;
    var userbname = userinfo.username + bname;
    var bamount = Number(document.getElementById("create-bamount").value);
    //makes sure that budget inputs are populated
    if (bname == "" || bamount == 0) {
        alert('Please fill out both budget feilds');
    }
    //checks to see if budget already exists
    else if (localStorage.getItem(userbname) !== null) {
        alert("Budget category already exists");
    }
    else {
        //Create and store new budget in local storage
        var newbudget = new classes_js_1.Budget(bname, bamount);
        localStorage.setItem(userbname, JSON.stringify(newbudget));
        //get user budgets array
        var listname = userinfo.username + 'budgets';
        var userbudgets = JSON.parse(localStorage.getItem(listname));
        //store user budgets
        userbudgets.push(userbname);
        localStorage.setItem(listname, JSON.stringify(userbudgets));
        alert('Budget Created!');
        displaystuff('createbudget');
        window.open("home.html", "_self");
    }
}
