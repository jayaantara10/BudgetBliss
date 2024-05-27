import {TransactionModel} from '../../domain/models/TransactionModel';

export const calculateIncomeAndExpense = (transactions: TransactionModel[]) => {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    if (transaction.isIncome) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  }

  return {totalIncome, totalExpense};
};

export const calculateIncomeAndExpenseForMonth = (
  transactions: TransactionModel[],
  targetMonth: number,
  targetYear: number,
) => {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth();
    const transactionYear = transactionDate.getFullYear();

    if (transactionMonth === targetMonth && transactionYear === targetYear) {
      if (transaction.isIncome) {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    }
  }

  return {totalIncome, totalExpense};
};
