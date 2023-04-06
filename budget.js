"use strict";
const currentUser = sessionStorage.getItem("useris");
const userInfo = JSON.parse(localStorage.getItem(currentUser));
const userBudgets = JSON.parse(localStorage.getItem(userInfo.username + "budgets"));
window.onload = displayBudgets(userBudgets);
function displayBudgets(listarray, i = 0, allBudgets = "") {
    if (i != listarray.length) {
        const budget = JSON.parse(localStorage.getItem(listarray[i]));
        const name = budget.budgetname;
        const amount = budget.budgetamount;
        const spent = budget.spent;
        const remaining = amount - spent;
        const percent = spent / amount;
        let red = 0;
        if (percent <= 1) {
            red = 400 * percent;
        }
        else {
            red = 1;
        }
        const green = 400 - red;
        const addHtml = `<div class= "budgets-container" id="${listarray[i]}">
        <h1>${name}</h1>
         <section id="${name}" style="flex-direction: row;">
          <canvas class="green" id="${name + '1'}" width="${green}" height="25">
            <script>
              var c = document.getElementById("${name + '1'}");
              var ctx = c.getContext("2d");
              ctx.fillStyle = "#378536";
              ctx.fillRect(0,0, ${green}, 25);
              </script>
          </canvas>
          <canvas class="red" id="${name + '2'}" width="${red}" height="25">
            <script>
              var c = document.getElementById("${name + '2'}");
              var ctx = c.getContext("2d");
              ctx.fillStyle = "red";
              ctx.fillRect(0,0, ${red}, 25);
              </script>
          </canvas>
      </section>
        <p>Budgeted Amount: ${amount}</p>
        <p>Spent: ${spent}</p>
        <p>Amount Remaining: ${remaining}</p>

      
        <button type="button" id="addexpense" onclick = "addExp('${listarray[i]}')">Add Expense</button>
        <input id="${listarray[i]}addexp" type="number" placeholder="Add Expense" name="addexpbtn"/>
        <button type="button" id="deletebudget" onclick="deletebudget('${listarray[i]}')">Delete</button>
      </div>`;
        const string = allBudgets.concat(addHtml);
        i = i + 1;
        return displayBudgets(listarray, i, string);
    }
    else {
        let htmldoc = document.getElementById("budgets");
        htmldoc.innerHTML = allBudgets;
        return console.log("Done...");
    }
}
function addExp(budgetname) {
    const budgetinfo = JSON.parse(localStorage.getItem(budgetname));
    const expense = Number(document.getElementById(`${budgetname}addexp`).value) + Number(budgetinfo.spent);
    budgetinfo.spent = expense;
    localStorage.setItem(budgetname, JSON.stringify(budgetinfo));
    window.onload = displayBudgets(userBudgets);
}
function deletebudget(budgetname) {
    const budgetarr = userBudgets;
    const index = budgetarr.indexOf(budgetname);
    budgetarr.splice(index, 1);
    localStorage.removeItem(budgetname);
    localStorage.setItem(userInfo.username + "budgets", JSON.stringify(budgetarr));
    alert("Budget Deleted");
    window.onload = displayBudgets(userBudgets);
}
