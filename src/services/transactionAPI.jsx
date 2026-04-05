import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7159/api'
});

export const getTransactions = async () => {
  const response = await api.get('/Transaction');
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post('/Transaction', transactionData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/Transaction/${id}`);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(`/Transaction/${id}`, transactionData);
  return response.data;
};
