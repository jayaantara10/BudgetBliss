import {TransactionModel} from '../../domain/models/TransactionModel';

// Make navigation param alias
export type ParamNavigator = {
  Splash: undefined;
  OnBoarding: undefined;
  Authentication: undefined;
  Home: undefined;
  ManagementTransaction: {
    transaction?: TransactionModel;
  };
  TransactionHistory: undefined;
};
