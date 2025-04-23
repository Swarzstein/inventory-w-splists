import { Table } from "react-bootstrap"

const FacilityBalanceTable = (props) => {
  const budgets = props.budgets;
  const balance = props.balance;
  const annualTotal = budgets.reduce((acc, budget) => acc + budget.annualBudget, 0);
  const quarterTotal = annualTotal / 4;
  

  return (
    <Table>
      <thead className="table-primary">
        <tr className="text-center align-middle">
          <th>Facility</th>
          <th>Annual Budget</th>
          <th>Quarter Budget</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {budgets.map((budget, index) => {
          return (
            <tr key={index + 1}  className="text-end">
              <th className="text-start">{budget.facility}</th>
              <th>{budget.annualBudget.toFixed(2)}</th>
              <th>{(budget.annualBudget / 4).toFixed(2)}</th>
            </tr>
          )
        })}
        <tr className="text-end">
          <th className="text-start">Total</th>
          <th>{annualTotal.toFixed(2)}</th>
          <th>{quarterTotal.toFixed(2)}</th>
        </tr>
        <tr className="table-group-divider table-primary">
          <th className="text-end">Balance</th>
          <th className="text-end">{balance.toFixed(2)}</th>
          <th></th>
        </tr>
      </tbody>
    </Table>
  )
}

export default FacilityBalanceTable