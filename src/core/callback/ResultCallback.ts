export type ResultCallback<T> = {
  onSuccess: (result?: T) => void;
  onError: (errorMessage: string) => void;
  onLoading: () => void;
};
