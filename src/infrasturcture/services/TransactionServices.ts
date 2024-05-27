import database from '@react-native-firebase/database';
import {ResultCallback} from '../../core/callback/ResultCallback';
import {TransactionModel} from '../../domain/models/TransactionModel';
import {DB_TRANSACTION_REF} from '../../core/constant/databaseRefConstant';
import {AddTransactionDTO} from '../dto/AddTransactionDTO';
import {UpdateTransactionDTO} from '../dto/UpdateTransactionDTO';
import {
  sortTransactionsByCreatedAt,
  sortTransactionsByCreatedAtAsc,
} from '../../core/utils/sortingUtils';

// Make services for transaction
export const TransactionServices = () => {
  // Add transaction
  const add = async (
    transaction: AddTransactionDTO,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      const newTransaction = database().ref(DB_TRANSACTION_REF);
      await newTransaction.push(transaction);
      onSuccess();
    } catch (error: any) {
      console.log('Add Transaction Error: ', error);
      onError('add_transaction_error');
    }
  };

  // Update
  const update = async (
    key: string,
    transaction: UpdateTransactionDTO,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      await database()
        .ref(`${DB_TRANSACTION_REF}/${key}`)
        .update({
          ...transaction,
        });
      onSuccess();
    } catch (error: any) {
      console.log('Update Transaction Error: ', error);
      onError('update_transaction_error');
    }
  };

  // Delete
  const deleteTransaction = async (
    key: string,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      await database().ref(`${DB_TRANSACTION_REF}/${key}`).remove();
      console.log('testing:', key);
      onSuccess();
    } catch (error: any) {
      console.log('Delete Transaction Error: ', error);
      onError('delete_transaction_orror');
    }
  };

  // get list
  const getList = async (
    uid: string,
    {onSuccess, onLoading, onError}: ResultCallback<TransactionModel[]>,
  ) => {
    try {
      onLoading();
      const transactionsRef = database()
        .ref(DB_TRANSACTION_REF)
        .orderByChild('uid')
        .equalTo(uid);
      const snapshot = await transactionsRef.once('value');
      const transactions: TransactionModel[] = [];
      // @ts-ignore
      snapshot.forEach(childSnapshot => {
        const transactionData = childSnapshot.val() as TransactionModel;
        const transactionKey = childSnapshot.key;
        const transaction = {...transactionData, key: transactionKey};
        // @ts-ignore
        transactions.push(transaction);
      });

      console.log('Snapshoot', transactions);
      const sortedDatabase = sortTransactionsByCreatedAt(transactions);
      onSuccess(sortedDatabase);
    } catch (error: any) {
      console.log('View Transaction Error: ', error);
      onError('Get transaction error, please check your connection');
    }
  };

  return {
    add,
    update,
    deleteTransaction,
    getList,
  };
};
