export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isConfirmPasswordHasSame = (
  password: string,
  confPassword: string,
) => password !== confPassword;

export const isPasswordIsValid = (password: string) => password.length > 8;
