import React, { createContext, useReducer, useContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(sessionStorage.getItem('transactions')) || [{"amount":2500,"date":"2022-10-22","category":"Business","type":"Income","id":"1b066552-0807-487a-9959-8b537ba96880"}];

const ExpenseTracker = createContext(initialState);
 
export const useExpenseTrackerContext = () => {
    return useContext(ExpenseTracker);
}

export const ExpenseTrackerProvider = ({ children }) => {

  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const balance = transactions.reduce((acc, currValue) => {
    return ( currValue.type === 'Expense' ? acc - currValue.amount : acc + currValue.amount )
  }, 0)

  // Dispatch functions

  const deleteTransaction = (id) => (
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  );

  const addTransaction = (transactions) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transactions })
  }

  return (
    <ExpenseTracker.Provider value={{
      deleteTransaction,
      addTransaction,
      transactions,
      balance
    }}>
        {children}
    </ExpenseTracker.Provider>
  )
}

