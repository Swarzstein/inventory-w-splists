import { Table } from "react-bootstrap";

const EmployeesBudgetTable = (props) => {
  const account = props.account;
  const spents = account.budgets.map(budget => {
    const spent = budget.employee.spent;
    return (spent.firstQuarter + spent.secondQuarter + spent.thirdQuarter + spent.fourthQuarter).toFixed(2);
  })
  const totalSpent = spents.reduce((a, b) => a + parseFloat(b), 0).toFixed(2)
  
  return (
    <Table>
      <thead>
        <tr>
          <th>{account.number} - {account.name} Spents</th>
        </tr>
        <tr>
          <th>Employee</th>
          <th>Spent</th>
        </tr>
      </thead>
      <tbody>
        {account.budgets.map((employee, index) => {
          return (
            <tr>
              <th>{employee.position}</th>
              <th>{spents[index]}</th>
            </tr>
          )
        })}
        <tr>
          <th>Total Spent</th>
          <th>{totalSpent}</th>
        </tr>
      </tbody>
    </Table>
  )
};

export default EmployeesBudgetTable;