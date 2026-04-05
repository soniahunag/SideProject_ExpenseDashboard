function SummaryCards({ summary }) {
  const { totalIncome, totalExpense, balance } = summary;

  return (
    <section className="summary-cards">
      <div className="summary-card">
        <h2>Total Income</h2>
        <p>{totalIncome}</p>
      </div>
      <div className="summary-card">
        <h2>Total Expense</h2>
        <p>{totalExpense}</p>
      </div>
      <div className="summary-card">
        <h2>Balance</h2>
        <p>{balance}</p>
      </div>
    </section>
  );
}

export default SummaryCards;
