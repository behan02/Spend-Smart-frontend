// Interface for category icon type
interface iconType {
    id?: number;           // Optional for backward compatibility
    category: string;
    icon: string;
    color: string;
}

// Combined category icons with both old and new categories
const CategoryIcons: iconType[] = [
    // Income categories
    { id: 1, category: "Salary / Income", icon: "💵", color: "#4CAF50" },
    { category: "Salary", icon: "💰", color: "#19A23D" },
    { id: 22, category: "Business", icon: "🏢", color: "#1976D2" },
    { id: 23, category: "Investment", icon: "📈", color: "#388E3C" },
    { category: "Interest", icon: "💸", color: "#FF6F61" },
    { id: 24, category: "Interest & Dividends", icon: "💹", color: "#00796B" },
    { category: "Gift", icon: "🎁", color: "#4ECDC4" },
    { id: 18, category: "Gifts & Donations", icon: "🎁", color: "#CDDC39" },
    { category: "Refund", icon: "💳", color: "#F39C12" },
    { category: "Other Income", icon: "📦", color: "#808080" },
    
    // Savings & Essential categories
    { id: 2, category: "Savings & Emergency Fund", icon: "💰", color: "#2196F3" },
    { id: 3, category: "Bills & Utilities", icon: "💡", color: "#FF9800" },
    { category: "Bill", icon: "🧾", color: "#EE3838" },
    { id: 10, category: "Taxes", icon: "💸", color: "#607D8B" },
    { id: 11, category: "Insurance", icon: "🛡️", color: "#3F51B5" },
    { id: 9, category: "Debt / Loan Payments", icon: "💳", color: "#9C27B0" },
    { id: 25, category: "Bank Charges & Fees", icon: "🏦", color: "#5D4037" },
    
    // Housing & Living
    { id: 6, category: "Housing & Rent", icon: "🏠", color: "#795548" },
    { category: "Rent", icon: "🏠", color: "#0077B6" },
    { id: 21, category: "Maintenance & Repairs", icon: "🛠️", color: "#78909C" },
    
    // Food & Dining
    { id: 4, category: "Food & Beverages", icon: "🍔", color: "#FF5722" },
    { category: "Food", icon: "🍔", color: "#EE3838" },
    
    // Transportation
    { id: 5, category: "Transportation", icon: "🚗", color: "#03A9F4" },
    { category: "Transport", icon: "🚌", color: "#03A791" },
    
    // Shopping & Personal
    { id: 7, category: "Shopping", icon: "🛍️", color: "#E91E63" },
    { category: "Shopping", icon: "🛒", color: "#D50B8B" },
    { id: 15, category: "Clothing & Accessories", icon: "👔", color: "#8BC34A" },
    { id: 16, category: "Personal Care", icon: "💄", color: "#E1BEE7" },
    
    // Healthcare
    { id: 8, category: "Healthcare", icon: "🏥", color: "#F44336" },
    { category: "Healthcare", icon: "🏥", color: "#2ECC71" },
    
    // Entertainment & Leisure
    { id: 13, category: "Entertainment", icon: "🎬", color: "#FF6F00" },
    { category: "Entertainment", icon: "🎮", color: "#3D74B6" },
    { id: 14, category: "Subscriptions", icon: "📱", color: "#6A1B9A" },
    { id: 17, category: "Travel", icon: "✈️", color: "#00BCD4" },
    { id: 19, category: "Events & Celebrations", icon: "🎉", color: "#FFC107" },
    
    // Education & Professional
    { id: 12, category: "Education", icon: "🎓", color: "#009688" },
    { category: "Education", icon: "📚", color: "#8E44AD" },
    { id: 26, category: "Legal & Professional Services", icon: "⚖️", color: "#424242" },
    
    // Others
    { id: 20, category: "Pets", icon: "🐶", color: "#FF8A65" },
    { id: 27, category: "Other / Miscellaneous", icon: "📦", color: "#9E9E9E" },
    { category: "Other Expense", icon: "📦", color: "#808080" }
];

export default CategoryIcons;
export type { iconType };