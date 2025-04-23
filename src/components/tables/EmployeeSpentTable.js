import { Table } from "react-bootstrap"

const EmployeeSpentTable = (props) => {
  const { budgets, index } = props;
  
  const quarter = () => {
    switch (index) {
      case 0:
        return 'firstQuarter';
      case 1:
        return 'secondQuarter';
      case 2:
        return 'thirdQuarter';
      case 3:
        return 'fourthQuarter';
      default:
        return 'firstQuarter';
    }
  };

  const title = () => {
    switch (index) {
      case 0:
        return '(First Quarter) JAN - MAR';
      case 1:
        return '(Second Quarter) APR - JUN';
      case 2:
        return '(Third Quarter) JUL - SEP';
      case 3:
        return '(Fourth Quarter) OCT - DEC';
      default:
        return '(First Quarter) JAN - MAR';
    }
  };

  let totalBudget = budgets.reduce((sum, budget) => sum + budget.employee.budget[quarter()], 0);
  let totalSpent = budgets.reduce((sum, budget) => sum + budget.employee.spent[quarter()], 0);

  return (

    <Table className="align-middle vw-50 m-0">
      <thead>
        <tr className="table-secondary" bg="primary">
          <th colSpan={4} className="text-start">Employee Spent {title()}</th>
        </tr>
        <tr className="text-center">
          <th></th>
          <th>Budget</th>
          <th>Spent</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map(budget => {
          let bud = budget.employee.budget[quarter()];
          let spent = budget.employee.spent[quarter()];
          return (
            <tr>
              <th>{budget.employee.firstName} {budget.employee.lastName}</th>
              <th className={bud < 0 ? "text-end text-danger" : "text-end fw-normal"}>{bud == null ? "-" : `${bud.toFixed(2)}$`}</th>
              <th className={spent < 0 ? "text-end text-danger" : "text-end fw-normal"}>{spent == null ? "-" : `${spent.toFixed(2)}$`}</th>
              <th className={(bud - spent) < 0 ? "text-end text-danger" : "text-end fw-normal"}>{(bud - spent).toFixed(2)}$</th>
            </tr>
          )
        })}
        <tr className="table-group-divider">
          <th className="text-end"></th>
          <th className={totalBudget < 0 ? "text-end text-danger" : "text-end"}>{`${totalBudget.toFixed(2)}$`}</th>
          <th className={totalSpent < 0 ? "text-end text-danger" : "text-end"}>{`${totalSpent.toFixed(2)}$`}</th>
          <th className={(totalBudget - totalSpent) < 0 ? "text-end text-danger" : "text-end"}>{(totalBudget - totalSpent).toFixed(2)}$</th>
        </tr>
      </tbody>
    </Table>
  )
};

export default EmployeeSpentTable;