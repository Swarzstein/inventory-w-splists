// Fetch Current Fiscal Year Budgets:
const fetchBudgets = async () => {
  const fiscalYear = new Date().getFullYear(); // Assuming fiscal year is the current year
  const response = await fetch(`https://your-sharepoint-site/_api/web/lists/getbytitle("Budgets")/items?$filter=AnnualBudgetId eq ${fiscalYear}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json; odata=verbose',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${yourAccessToken}`
      }
  });
  const data = await response.json();
  return data.d.results; // This will return the budgets for the current fiscal year
};

// Fetch Accounts:
const fetchAccounts = async () => {
  const response = await fetch('https://your-sharepoint-site/_api/web/lists/getbytitle("Accounts")/items', {
      method: 'GET',
      headers: {
          'Accept': 'application/json; odata=verbose',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${yourAccessToken}`
      }
  });
  const data = await response.json();
  return data.d.results; // This will return all accounts
};

// Combine Data:
const getAccountsWithBudgets = async () => {
  const budgets = await fetchBudgets();
  const accounts = await fetchAccounts();

  const accountsWithBudgets = accounts.map(account => {
      const budget = budgets.find(b => b.AccountId === account.Id);
      return {
          AccountNumber: account.AccountNumber,
          AccountDescription: account.AccountDescription,
          Assigned: budget ? budget.Assigned : 0,
          Spent: budget ? budget.Spent : 0
      };
  });

  console.log(accountsWithBudgets); // This will log the combined data
};

/*Modifying a data*/
const budgetId = '<ID_DEL_BUDGET>'; // Reemplaza con el ID del budget que deseas modificar
const newSpentValue = "<NUEVO_VALOR>"; // Reemplaza con el nuevo valor que deseas establecer

fetch(`https://your-sharepoint-site/_api/web/lists/getbytitle("Budgets")/items(${budgetId})`, {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${yourAccessToken}`,
        'IF-MATCH': '*', // Esto asegura que se actualice el elemento más reciente
        'X-HTTP-Method': 'MERGE' // Indica que se está realizando una actualización
    },
    body: JSON.stringify({
        spents: newSpentValue // Aquí se establece el nuevo valor para el campo "spents"
    })
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Error al actualizar el budget');
})
.then(data => console.log('Budget actualizado:', data))
.catch(error => console.error('Error:', error));
