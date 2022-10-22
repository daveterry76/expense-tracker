import React from 'react'
import { useExpenseTrackerContext } from '../context/ExpenseTrackerContext';
import { incomeCategories, expenseCategories, resetCategories } from '../constants/categories';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
  );

const useTransaction = (title) => {
    resetCategories();
    const { transactions } = useExpenseTrackerContext();
    const transactionPerType = transactions.filter((transaction) => transaction.type === title);
    const total = transactionPerType.reduce((acc, currValue) => acc = acc + currValue.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    console.log({ transactionPerType });

    transactionPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category);

        if (category) category.amount = category.amount + t.amount;
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color)
        }],
        labels: filteredCategories.map((c) => c.type)
    }

    return { total, chartData }
}

export default useTransaction