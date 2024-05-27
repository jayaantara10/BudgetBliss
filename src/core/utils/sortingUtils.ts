import {TransactionModel} from '../../domain/models/TransactionModel';

export const sortTransactionsByCreatedAt = (
  transactions: TransactionModel[],
): TransactionModel[] => {
  return transactions.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export const sortTransactionsByCreatedAtAsc = (
  transactions: TransactionModel[],
): TransactionModel[] => {
  return transactions.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};
