import { useState, useEffect } from "react";

function TransactionForm({ onAddTransaction, editingTransaction, onUpdateTransaction, onCancelEdit }) {
  const [formData, setFormData] = useState({
    type: "Expense",
    amount: "",
    category: "",
    txnDate: "",
    note: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        txnDate: editingTransaction.txnDate.split("T")[0],
        note: editingTransaction.note || "",
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, txnDate } = formData;

    if (!amount || !category || !txnDate) {
      alert("Please fill in amount, category, and date.");
      return;
    }

    if (editingTransaction) {
      onUpdateTransaction({
        id: editingTransaction.id,
        ...formData,
        amount: Number(formData.amount),
      });
    } else {
      const newTransaction = {
        type: formData.type,
        amount: Number(formData.amount),
        category: formData.category,
        txnDate: formData.txnDate,
        note: formData.note || "",
      };

      console.log("Request payload:", JSON.stringify(newTransaction, null, 2));
      onAddTransaction(newTransaction);

      setFormData({
        type: "Expense",
        amount: "",
        category: "",
        txnDate: "",
        note: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div>
        <label htmlFor="type">Type:</label>
        <select name="type" id="type" value={formData.type} onChange={handleChange}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="txnDate">Date:</label>
        <input
          type="date"
          name="txnDate"
          id="txnDate"
          value={formData.txnDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="note">Note:</label>
        <input
          type="text"
          name="note"
          id="note"
          value={formData.note}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{editingTransaction ? "Update Transaction" : "Add Transaction"}</button>
      {editingTransaction && (
        <button type="button" onClick={onCancelEdit}>Cancel</button>
      )}
    </form>
  );
}

export default TransactionForm;
