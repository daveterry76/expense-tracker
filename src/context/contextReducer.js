import React from 'react';

const contextReducer = (state, action) => {
    let transactions;

 switch (action.type) {
    case 'DELETE_TRANSACTION':
        transactions = state.filter((t) => t.id !== action.payload);

        sessionStorage.setItem('transactions', JSON.stringify(transactions))

        return transactions;
    case 'ADD_TRANSACTION':
        transactions = [action.payload, ...state];

        sessionStorage.setItem('transactions', JSON.stringify(transactions))

        return transactions;
    default:
        state;
 }
}

export default contextReducer;