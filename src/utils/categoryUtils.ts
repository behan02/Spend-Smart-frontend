import CategoryIcons, { iconType } from '../assets/categoryIcons/CategoryIcons';

/**
 * Utility function to find category icon and color by category name
 * @param categoryName - The name of the category to search for
 * @returns Object containing icon and color, or default values if not found
 */
export const getCategoryIconAndColor = (categoryName: string): { icon: string; color: string } => {
  // Normalize the category name for better matching
  const normalizedName = categoryName.toLowerCase().trim();
  
  // Find exact match first
  let categoryData = CategoryIcons.find(
    (cat: iconType) => cat.category.toLowerCase() === normalizedName
  );
  
  // If no exact match, try partial matching
  if (!categoryData) {
    categoryData = CategoryIcons.find(
      (cat: iconType) => 
        cat.category.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(cat.category.toLowerCase())
    );
  }
  
  // Return the icon and color if found, otherwise return defaults
  if (categoryData) {
    return {
      icon: categoryData.icon,
      color: categoryData.color
    };
  }
  
  // Default icon and color for unmatched categories
  return {
    icon: '📦', // Default miscellaneous icon
    color: '#9E9E9E' // Default gray color
  };
};

/**
 * Get all available category icons for selection
 * @returns Array of all category icons with their data
 */
export const getAllCategoryIcons = (): iconType[] => {
  return CategoryIcons;
};

/**
 * Find category by ID
 * @param id - The ID of the category
 * @returns Category data or undefined if not found
 */
export const getCategoryById = (id: number): iconType | undefined => {
  return CategoryIcons.find((cat: iconType) => cat.id === id);
};

/**
 * Get category data for budget display
 * @param categories - Array of budget categories
 * @returns Array with enhanced category data including icons and colors
 */
export const enhanceCategoriesWithIcons = (categories: Array<{
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
}>): Array<{
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  icon: string;
  color: string;
  progress: number;
}> => {
  return categories.map(category => {
    const { icon, color } = getCategoryIconAndColor(category.name);
    const progress = category.allocatedAmount > 0 
      ? Math.round((category.spentAmount / category.allocatedAmount) * 100)
      : 0;
    
    return {
      ...category,
      icon,
      color,
      progress
    };
  });
};

/**
 * Get the top spending categories for budget overview
 * @param categories - Array of budget categories
 * @param limit - Number of top categories to return (default: 3)
 * @returns Array of top spending categories with icons
 */
export const getTopSpendingCategories = (categories: Array<{
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
}>, limit: number = 3) => {
  const enhancedCategories = enhanceCategoriesWithIcons(categories);
  
  return enhancedCategories
    .sort((a, b) => b.spentAmount - a.spentAmount)
    .slice(0, limit);
};
