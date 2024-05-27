export type CategoryModel = {
  id: string;
  category: string;
  color: string;
  icon: string;
};
// Define categories with their corresponding color and icon
export const categories: CategoryModel[] = [
  {
    id: '1',
    category: 'Food & Drink',
    color: '#FF5733', // Orange
    icon: 'fastfood', // Icon for Food & Drink
  },
  {
    id: '2',
    category: 'Entertain & Hobbies',
    color: '#8A2BE2', // Blue Violet
    icon: 'sports-esports', // Icon for Entertainment & Hobbies
  },
  {
    id: '3',
    category: 'Utilities',
    color: '#008000', // Green
    icon: 'home', // Icon for Housing & Utilities
  },
  {
    id: '4',
    category: 'Transport',
    color: '#FFA500', // Orange
    icon: 'directions-car', // Icon for Transport
  },
  {
    id: '5',
    category: 'Personal Needs',
    color: '#1E90FF', // Dodger Blue
    icon: 'person', // Icon for Personal Needs
  },
  {
    id: '6',
    category: 'Education',
    color: '#FFD700', // Gold
    icon: 'school', // Icon for Education
  },
  {
    id: '7',
    category: 'Investment',
    color: '#7FFF00', // Chartreuse
    icon: 'trending-up', // Icon for Investment
  },
  {
    id: '8',
    category: 'Debt Payment',
    color: '#FF0000', // Red
    icon: 'money-off', // Icon for Debt Payment
  },
  {
    id: '9',
    category: 'Other',
    color: '#A9A9A9', // Dark Gray
    icon: 'more-vert', // Icon for Other
  },
];
