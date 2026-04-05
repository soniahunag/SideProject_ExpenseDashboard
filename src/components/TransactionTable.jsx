function TransactionTable({ transactions, onDelete, onEdit }) {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.txnDate}</td>
            <td>{transaction.note}</td>
            <td>
              <button onClick={() => onEdit(transaction)} style={{ marginRight: '8px' }}>Edit</button>
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
