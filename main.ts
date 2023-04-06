import {User, Budget} from "./classes.js"

//Event Listeners for buttons throughout the site
document.getElementById("createaccount")?.addEventListener("click", createAccount);
document.getElementById("submitlogin")?.addEventListener("click", login);
window.addEventListener("load", loaduserdata);
document.getElementById("createbudgetbtn")?.addEventListener("click", createbudget);


//validates account creation and creates account and stores information
function createAccount(){

    //assigns varibles to user input
    const username: string = (<HTMLInputElement>document.getElementById("create-uname")).value.toLowerCase();
    const password: string = (<HTMLInputElement>document.getElementById("create-pass")).value;
    const verify: string = (<HTMLInputElement>document.getElementById("verify-pass")).value;
    const church: string = (<HTMLInputElement>document.getElementById("church-name")).value;
    
    // checks if username already exists
    if(localStorage.getItem(username) !== null){
        alert("Username already exists. Try a different Username.");
        throw new Error("Username already exists...");  
    }
    
    //checks if passwords match
    if(password !== verify){
        alert("Passwords don't match.");
        throw new Error ("Passwards don't match...");
    }

    //if checks are met, creates account
    else{
        const user = new User(username, password, church);
        const budgetlist: string[] = new Array();
        const listname:string = user.getusername + "budgets"; 
        localStorage.setItem(username, JSON.stringify(user));
        localStorage.setItem(listname, JSON.stringify(budgetlist));
        alert("Account created successfully!");
        window.open("login.html", "_self");
}
}

//validates user log in information
function login(){

    //assigns varibles from user input
    const username: string = (<HTMLInputElement>document.getElementById("uname")).value.toLowerCase();
    const password: string = (<HTMLInputElement>document.getElementById("password")).value;

    //retreives user data from local storage
    if (localStorage.getItem(username) !== null){
        const userinfo = JSON.parse(localStorage.getItem(username)!);
        const pass = userinfo.password;
        const uname = userinfo.username;

        //Validates log in
        if (username == uname && password == pass){
            sessionStorage.setItem("useris", userinfo.username);
            alert(`You have successfully loged into ${uname}!`);
            window.open("home.html", "_self");
        }
        else{
            alert("Invalid Password. Please try again");
        }
    }
    else{
        alert("Invalid Username or Password. Please try again");
    }
    
}

//loads user data if on home.html page
function loaduserdata(){
    const regex1 = /home/;
    const url: string = window.location.href;

    //uses regex to check if on home.html page
    if (regex1.test(url)){
        const username: string = sessionStorage.getItem("useris")!;
        const userinfo = JSON.parse(localStorage.getItem(username)!);

        document.getElementById("hometitle").innerHTML = `${userinfo.churchname} Budget`;
    } 
    else {
        console.log('Something went wrong...');
    }  
}

//displays and loads budgets for user
const displaystuff = (name: string) => {
    var element = (<HTMLInputElement>document.getElementById(name))
    if(element.style.display == "none"){
      element.style.display = "flex"  
    }
    else{element.style.display = "none"}
    }

//create budget object in local storage
function createbudget(){

    //assigns varibles to a budget object
    const username: string = sessionStorage.getItem("useris")!;
    const userinfo = JSON.parse(localStorage.getItem(username)!);
    const bname: string = (<HTMLInputElement>document.getElementById("create-bname")).value;
    const userbname: string = userinfo.username + bname;
    const bamount: number = Number((<HTMLInputElement>document.getElementById("create-bamount")).value);

    //makes sure that budget inputs are populated
    if(bname == "" || bamount == 0){
        alert('Please fill out both budget feilds');
    }
    
    //checks to see if budget already exists
    else if(localStorage.getItem(userbname) !== null){
        alert("Budget category already exists");
    }
    else {
        //Create and store new budget in local storage
        const newbudget = new Budget(bname, bamount);
        localStorage.setItem(userbname, JSON.stringify(newbudget));

        //get user budgets array
        const listname: string = userinfo.username + 'budgets';
        const userbudgets: string[] = JSON.parse(localStorage.getItem(listname)!);
        
        //store user budgets
        userbudgets.push(userbname);
        localStorage.setItem(listname, JSON.stringify(userbudgets));

        alert('Budget Created!');
        displaystuff('createbudget');
        window.open("home.html", "_self")
    }
}


