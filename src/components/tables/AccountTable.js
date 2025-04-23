import { Table } from "react-bootstrap"

const AccountTable = (props) => {
  const budgets = props.budgets;
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.assigned, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  return (
    <Table className="mb-0">
      <thead>
        <tr className="text-center align-middle">
          <th>Account</th>
          <th>Description</th>
          <th>Budget</th>
          <th> Spent</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {budgets.map(budget => {
          return (
            <tr>
              <th className="fw-normal">{budget.code}</th>
              <th className="fw-normal">{budget.name}</th>
              <th className="text-end fw-normal">{budget.assigned.toFixed(2)}$</th>
              <th className="text-end fw-normal">{budget.spent.toFixed(2)}$</th>
              <th className="text-end fw-normal">{(budget.assigned - budget.spent).toFixed(2)}$</th>
            </tr>
          )
        })}
        <tr className="table-group-divider">
          <th colSpan={2}>Grand Total</th>
          <th className="text-end">{totalBudget.toFixed(2)}$</th>
          <th className="text-end">{totalSpent.toFixed(2)}$</th>
          <th className="text-end">{(totalBudget - totalSpent).toFixed(2)}$</th>
        </tr>
      </tbody>
    </Table>
  )
}

export default AccountTable