CREATE TABLE AnnualBudget (
  Id AUTOINCREMENT PRIMARY KEY,
  FiscalYear NUMBER
);

CREATE TABLE Accounts (
 Id AUTOINCREMENT PRIMARY KEY,
 AccountNumber NUMBER,
 AccountDescription TEXT,
 AccountType TEXT
);

CREATE TABLE Employees (
  Id AUTOINCREMENT PRIMARY KEY,
  Position TEXT,
  PositionAbr TEXT
);

CREATE TABLE Budgets (
  Id AUTOINCREMENT PRIMARY KEY,
  Assigned CURRENCY,
  Spent CURRENCY,
  AnnualBudgetId LONG,
  AccountId LONG,
  FOREIGN KEY (AnnualBudgetId) REFERENCES AnnualBudget(id),
  FOREIGN KEY (AccountsId) REFERENCES Accounts(id)
);

CREATE TABLE EmployeeBudgets (
  id AUTOINCREMENT PRIMARY KEY,
  Assigned CURRENCY,
  Spent CURRENCY,
  BudgetId LONG,
  EmployeeId LONG,
  FOREIGN KEY (BudgetId) REFERENCES Budgets(Id),
  FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
);

CREATE TABLE QuarterBudgets (
  Id AUTOINCREMENT PRIMARY KEY,
  Assigned CURRENCY,
  Spent CURRENCY,
  BudgetQuarter NUMBER,
  EmployeeBudgetId LONG,
  FOREIGN KEY (EmployeeBudgetId) REFERENCES EmployeeBudgets(Id),
);

CREATE TABLE Bill (
  Id AUTOINCREMENT PRIMARY KEY,
  BillDescription TEXT,
  Amount CURRENCY,
  BillDate DATE,
  QuarterBudgetId LONG,
  BudgetId LONG,
  FOREIGN KEY (QuarterBudgetId) REFERENCES QuarterBudgets(Id),
  FOREIGN KEY (BudgetId) REFERENCES Budgets(Id)
)