import { useMemo, useState, useEffect } from "react";
// import { mockTransactions } from "../data/mockTransactions"; // OLD VERSION: using mock data
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from '../services/transactionAPI';

function DashboardPage() {
  // OLD VERSION: const [transactions, setTransactions] = useState(mockTransactions);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions on first render
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "Income") {
          acc.totalIncome += transaction.amount;
        } else if (transaction.type === "Expense") {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    return {
      totalIncome: totals.totalIncome,
      totalExpense: totals.totalExpense,
      balance: totals.totalIncome - totals.totalExpense,
    };
  }, [transactions]);

  // OLD VERSION: const handleAddTransaction = (newTransaction) => {
  //   setTransactions((currentTransactions) => [newTransaction, ...currentTransactions]);
  // };
  const handleAddTransaction = async (newTransaction) => {
    try {
      await createTransaction(newTransaction);
      // Reload transactions after adding
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      // Reload transactions after deleting
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction);
      // Reload transactions after updating
      const data = await getTransactions();
      setTransactions(data);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const summary = {
    totalIncome,
    totalExpense,
    balance,
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <main className="dashboard-page">
      <h1>Expense Tracker Dashboard</h1>
      <SummaryCards summary={summary} />
      <TransactionForm 
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        editingTransaction={editingTransaction}
        onCancelEdit={handleCancelEdit}
      />
      <TransactionTable 
        transactions={transactions} 
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
    </main>
  );
}

export default DashboardPage;