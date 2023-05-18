var currentUser = sessionStorage.getItem("useris");
var userInfo = JSON.parse(localStorage.getItem(currentUser));
var userBudgets = JSON.parse(localStorage.getItem(userInfo.username + "budgets"));
window.onload = displayBudgets(userBudgets);
function displayBudgets(listarray, i, allBudgets) {
    if (i === void 0) { i = 0; }
    if (allBudgets === void 0) { allBudgets = ""; }
    if (i != listarray.length) {
        var budget = JSON.parse(localStorage.getItem(listarray[i]));
        var name_1 = budget.budgetname;
        var amount = budget.budgetamount;
        var spent = budget.spent;
        var remaining = amount - spent;
        var percent = spent / amount;
        var red = 0;
        if (percent <= 1) {
            red = 400 * percent;
        }
        else {
            red = 1;
        }
        var green = 400 - red;
        var addHtml = "<div class= \"budgets-container\" id=\"".concat(listarray[i], "\">\n        <h1>").concat(name_1, "</h1>\n         <section id=\"").concat(name_1, "\" style=\"flex-direction: row;\">\n          <canvas class=\"green\" id=\"").concat(name_1 + "1", "\" width=\"").concat(green, "\" height=\"25\">\n            <script>\n              var c = document.getElementById(\"").concat(name_1 + "1", "\");\n              var ctx = c.getContext(\"2d\");\n              ctx.fillStyle = \"#378536\";\n              ctx.fillRect(0,0, ").concat(green, ", 25);\n              </script>\n          </canvas>\n          <canvas class=\"red\" id=\"").concat(name_1 + "2", "\" width=\"").concat(red, "\" height=\"25\">\n            <script>\n              var c = document.getElementById(\"").concat(name_1 + "2", "\");\n              var ctx = c.getContext(\"2d\");\n              ctx.fillStyle = \"red\";\n              ctx.fillRect(0,0, ").concat(red, ", 25);\n              </script>\n          </canvas>\n      </section>\n        <p>Budgeted Amount: ").concat(amount, "</p>\n        <p>Spent: ").concat(spent, "</p>\n        <p>Amount Remaining: ").concat(remaining, "</p>\n\n      \n        <button type=\"button\" id=\"addexpense\" onclick = \"addExp('").concat(listarray[i], "')\">Add Expense</button>\n        <input id=\"").concat(listarray[i], "addexp\" type=\"number\" placeholder=\"Add Expense\" name=\"addexpbtn\"/>\n        <button type=\"button\" id=\"deletebudget\" onclick=\"deletebudget('").concat(listarray[i], "')\">Delete</button>\n      </div>");
        var string = allBudgets.concat(addHtml);
        i = i + 1;
        return displayBudgets(listarray, i, string);
    }
    else {
        var htmldoc = document.getElementById("budgets");
        htmldoc.innerHTML = allBudgets;
        return console.log("Done...");
    }
}
function addExp(budgetname) {
    var budgetinfo = JSON.parse(localStorage.getItem(budgetname));
    var expense = Number(document.getElementById("".concat(budgetname, "addexp")).value) + Number(budgetinfo.spent);
    budgetinfo.spent = expense;
    localStorage.setItem(budgetname, JSON.stringify(budgetinfo));
    window.onload = displayBudgets(userBudgets);
}
function deletebudget(budgetname) {
    var budgetarr = userBudgets;
    var index = budgetarr.indexOf(budgetname);
    budgetarr.splice(index, 1);
    localStorage.removeItem(budgetname);
    localStorage.setItem(userInfo.username + "budgets", JSON.stringify(budgetarr));
    alert("Budget Deleted");
    window.onload = displayBudgets(userBudgets);
}
