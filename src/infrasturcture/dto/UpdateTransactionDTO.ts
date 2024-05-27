export type UpdateTransactionDTO = {
  title: string;
  categoryId?: string;
  isIncome: boolean;
  description: string;
  amount: number;
  date: string;
};
