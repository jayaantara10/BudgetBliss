// Currency formatter
export const formatRupiah = (number: number): string => {
  // Convert the number to string and split it into integer and decimal parts
  const parts = number.toFixed(2).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] === '00' ? '' : `,${parts[1]}`; // Only add decimal part if not '00'

  // Add dot as a thousands separator every 3 digits from the back
  const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Return the formatted Rupiah string
  return `Rp ${integerFormatted}${decimalPart}`;
};
