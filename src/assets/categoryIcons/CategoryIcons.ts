interface iconType {
    id: number;           // Add this field
    category: string;
    icon: string;
    color: string;
}

const CategoryIcons: iconType[] = [
    { id: 1, category: "Salary / Income", icon: "💵", color: "#4CAF50" },
    { id: 2, category: "Savings & Emergency Fund", icon: "💰", color: "#2196F3" },
    { id: 3, category: "Bills & Utilities", icon: "💡", color: "#FF9800" },
    { id: 4, category: "Food & Beverages", icon: "🍔", color: "#FF5722" },
    { id: 5, category: "Transportation", icon: "🚗", color: "#03A9F4" },
    { id: 6, category: "Housing & Rent", icon: "🏠", color: "#795548" },
    { id: 7, category: "Shopping", icon: "🛍️", color: "#E91E63" },
    { id: 8, category: "Healthcare", icon: "🏥", color: "#F44336" },
    { id: 9, category: "Debt / Loan Payments", icon: "💳", color: "#9C27B0" },
    { id: 10, category: "Taxes", icon: "💸", color: "#607D8B" },
    { id: 11, category: "Insurance", icon: "🛡️", color: "#3F51B5" },
    { id: 12, category: "Education", icon: "🎓", color: "#009688" },
    { id: 13, category: "Entertainment", icon: "🎬", color: "#FF6F00" },
    { id: 14, category: "Subscriptions", icon: "📱", color: "#6A1B9A" },
    { id: 15, category: "Clothing & Accessories", icon: "👔", color: "#8BC34A" },
    { id: 16, category: "Personal Care", icon: "💄", color: "#E1BEE7" },
    { id: 17, category: "Travel", icon: "✈️", color: "#00BCD4" },
    { id: 18, category: "Gifts & Donations", icon: "🎁", color: "#CDDC39" },
    { id: 19, category: "Events & Celebrations", icon: "🎉", color: "#FFC107" },
    { id: 20, category: "Pets", icon: "🐶", color: "#FF8A65" },
    { id: 21, category: "Maintenance & Repairs", icon: "🛠️", color: "#78909C" },
    { id: 22, category: "Business", icon: "🏢", color: "#1976D2" },
    { id: 23, category: "Investment", icon: "📈", color: "#388E3C" },
    { id: 24, category: "Interest & Dividends", icon: "💹", color: "#00796B" },
    { id: 25, category: "Bank Charges & Fees", icon: "🏦", color: "#5D4037" },
    { id: 26, category: "Legal & Professional Services", icon: "⚖️", color: "#424242" },
    { id: 27, category: "Other / Miscellaneous", icon: "📦", color: "#9E9E9E" },
];

export default CategoryIcons;
export type { iconType };