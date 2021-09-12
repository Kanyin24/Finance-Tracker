//grab HTML elements
const balanceEl = document.getElementById('balance-value');
const money_plus = document.getElementById('addmoney');
const money_minus = document.getElementById('submoney');
const chart = document.getElementById('pie-chart');
const incomeList = document.getElementById('income-list');
const expensesList = document.getElementById('expenses-list');
const incomeText = document.getElementById('income-text');
const incomeAmount = document.getElementById('income-amount');
const btnIncome = document.getElementById('btn-income');
const expensesText = document.getElementById('expenses-text');
const expensesAmount = document.getElementById('expenses-amount');
const btnExpenses = document.getElementById('btn-expenses');


//change layout of project later as well so it doesn't look the same as the other project

//variables
let entry_List = [];
let balance = 0, income = 0, outcome = 0;
const DELETE = "delete";
let signItem;

//income button event listener
btnIncome.addEventListener("click", function() {
  //check if input boxes are filled in before further work
  if(!incomeText.value|| !incomeAmount.value)
  {
    alert('Add a text and amount');
    return;
  }
  
  let income = {
    type: "income",
    title: incomeText.value,
    amount: parseInt(incomeAmount.value),
  }

  entry_List.push(income);
  //console.log(entry_List);
  updateUI();
  clearInput([incomeText, incomeAmount]);

});

//expenses button event listener
btnExpenses.addEventListener("click", function() {
  //check if input boxes are filled in before further work
  if(!expensesText.value|| !expensesAmount.value)
  {
    alert('Add a text and amount');
    return;
  }

  let expense = {
    type: "expense",
    title: expensesText.value,
    amount: parseFloat(expensesAmount.value),
  }
  entry_List.push(expense);

  updateUI();
  clearInput([expensesText, expensesAmount]);

});

//checked saved data in localstorage
entry_List = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

//delete li element when click event is fired
incomeList.addEventListener("click", deleteElement);
expensesList.addEventListener("click", deleteElement);

//delete element function
function deleteElement(event){
  const targetBtn = event.target;

  const entry = targetBtn.parentNode;

  entry_List.splice (entry.id, 1);

  updateUI();
}

//clear input boxes (after button clicked)
function clearInput(inputs) {
  inputs.forEach(input => {
    input.value = "";
  });
}

//calculate income or expense values
function calcTotal(type, entry_List) {
  let sum = 0;
  entry_List.forEach(entry => {
    if(entry.type == type) {
      sum+=entry.amount;
    }
  });
  return sum;
}

//calculuate balance remaining
function calculateBalance(income, outcome) {
  return income+outcome;
}

//update all the elements on screen to display accurate info
function updateUI() {
  income = calcTotal("income", entry_List);
  //console.log(income);
  outcome = calcTotal("expense", entry_List);
  //console.log(outcome);
  balance = calculateBalance(income, outcome);
  //console.log(balance);

  let sign;

  //get accurate sign (- or +) for balance value
  if(balance >= 0)
  {
    sign = "$";
  }
  else if (balance < 0)
  {
    balance = Math.abs(balance);
    sign = "-$";
  }
  else
  {
    return;
  }

  //display values
  balanceEl.innerHTML = `${sign}${balance}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = "-$" + Math.abs(outcome);

  //clear element from array
  clearElement([incomeList, expensesList]);

  //sort expense and income inputs before displaying items
  entry_List.forEach((entry, index) => {
    if(entry.type == "expense") {
      signItem = "-$";
      showEntry(expensesList, entry.type, entry.title, entry.amount, index)
    } else if (entry.type == "income") {
      signItem = "$";
        showEntry(incomeList, entry.type, entry.title, entry.amount, index)
    }
  });
  
  localStorage.setItem("entry_list", JSON.stringify(entry_List));
}

//add each input to list in html
function showEntry(list, type, title, amount, id) {
  const entry = document.createElement('li');
  // entry.innerHTML = `<li id="${id}" class="${type}"> 
  //                   <div class="entry>${title}: $${amount}</div>
  //              
  //                   <div id="delete"></div>  </li>`);

  // list.innerHtml += entry;

  entry.innerHTML = `<div id="name">${title}</div>
                                <div id="amount">${signItem}${Math.abs(amount)}</div> 
                                <div id="delete"></div>
                                <div id="edit"></div>`;
  //remove the edit part^
  
  console.log(list.appendChild(entry));
  
  
}

//clear element
function clearElement(elements) {
  elements.forEach(element => {
    element.innerHTML = "";
  })
}

//calculate sum for each type (income & expenses)
function calculateTotal(type, list) {
  let sum = 0;

  list.forEach(entry => {
    if(entry.type == type) {
      sum += entry.amount;
    }
  })
  return sum;
}
