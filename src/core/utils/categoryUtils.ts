import {categories} from '../constant/categoryConstant';

// Function to get category by ID
export const getCategoryById = (id: string): string | undefined => {
  // Find category with the matching ID
  const category = categories.find(cat => cat.id === id);
  // Return category name if found, otherwise undefined
  return category ? category.category : undefined;
};

// Function to get color by category
export const getColorByCategory = (id: string): string | undefined => {
  // Find category with the matching name
  const category = categories.find(cat => cat.id === id);
  // Return color if category found, otherwise undefined
  return category ? category.color : undefined;
};

// Function to get icon by category
export const getIconByCategory = (id: string): string | undefined => {
  // Find category with the matching name
  const category = categories.find(cat => cat.id === id);
  // Return icon if category found, otherwise undefined
  return category ? category.icon : undefined;
};
