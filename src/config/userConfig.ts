// Centralized User Configuration
// Change the userId here to update it across the entire application

export const UserConfig = {
  // Change this value to update userId throughout the application
  currentUserId: 3,
  
  // Helper function to get the current user ID
  getCurrentUserId: (): number => {
    return UserConfig.currentUserId;
  },
  
  // Function to update the user ID (if needed for dynamic changes)
  setCurrentUserId: (newUserId: number): void => {
    UserConfig.currentUserId = newUserId;
  }
};

// Export the userId directly for easy importing
export const userId = UserConfig.currentUserId;
