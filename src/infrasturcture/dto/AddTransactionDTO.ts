export type AddTransactionDTO = {
  uid: string;
  title: string;
  categoryId?: string;
  isIncome: boolean;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
};
