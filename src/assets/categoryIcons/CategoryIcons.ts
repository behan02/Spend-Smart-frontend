import PaidIcon from '@mui/icons-material/Paid';<<<<<<< HEAD

import StoreIcon from '@mui/icons-material/Store';interface iconType {

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';    id: number;           // Add this field

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';    category: string;

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';=======

import FastfoodIcon from '@mui/icons-material/Fastfood';import PaidIcon from '@mui/icons-material/Paid';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';import StoreIcon from '@mui/icons-material/Store';

import HouseIcon from '@mui/icons-material/House';import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import ReceiptIcon from '@mui/icons-material/Receipt';import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import MenuIcon from '@mui/icons-material/Menu';import FastfoodIcon from '@mui/icons-material/Fastfood';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import { OverridableComponent } from '@mui/material/OverridableComponent';import HouseIcon from '@mui/icons-material/House';

import { SvgIconTypeMap } from '@mui/material';import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ReceiptIcon from '@mui/icons-material/Receipt';

interface iconType {import MenuIcon from '@mui/icons-material/Menu';

    id?: number;           // Optional for backward compatibilityimport SportsEsportsIcon from '@mui/icons-material/SportsEsports';

    category: string;import { OverridableComponent } from '@mui/material/OverridableComponent';

    icon: string;import { SvgIconTypeMap } from '@mui/material';

    color: string;

}interface iconType{

    category: string;

// Combined category icons with both old and new categories    // icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {

const CategoryIcons: iconType[] = [    //     muiName: string;

    // New categories from Duplicate-Goal-GoalDetails_Frontend    // }

    {    // color: string;

        category: "Salary",>>>>>>> Duplicate-Goal-GoalDetails_Frontend

        icon: "💰",    icon: string;

        color: "#19A23D"    color: string;

    },}

    {

        category: "Business",const CategoryIcons: iconType[] = [

        icon: "🏢",<<<<<<< HEAD

        color: "#0077B6"    { id: 1, category: "Salary / Income", icon: "💵", color: "#4CAF50" },

    },    { id: 2, category: "Savings & Emergency Fund", icon: "💰", color: "#2196F3" },

    {    { id: 3, category: "Bills & Utilities", icon: "💡", color: "#FF9800" },

        category: "Interest",    { id: 4, category: "Food & Beverages", icon: "🍔", color: "#FF5722" },

        icon: "💸",    { id: 5, category: "Transportation", icon: "🚗", color: "#03A9F4" },

        color: "#FF6F61"    { id: 6, category: "Housing & Rent", icon: "🏠", color: "#795548" },

    },    { id: 7, category: "Shopping", icon: "🛍️", color: "#E91E63" },

    {    { id: 8, category: "Healthcare", icon: "🏥", color: "#F44336" },

        category: "Investment",    { id: 9, category: "Debt / Loan Payments", icon: "💳", color: "#9C27B0" },

        icon: "📈",    { id: 10, category: "Taxes", icon: "💸", color: "#607D8B" },

        color: "#9B59B6"    { id: 11, category: "Insurance", icon: "🛡️", color: "#3F51B5" },

    },    { id: 12, category: "Education", icon: "🎓", color: "#009688" },

    {    { id: 13, category: "Entertainment", icon: "🎬", color: "#FF6F00" },

        category: "Gift",    { id: 14, category: "Subscriptions", icon: "📱", color: "#6A1B9A" },

        icon: "🎁",    { id: 15, category: "Clothing & Accessories", icon: "👔", color: "#8BC34A" },

        color: "#4ECDC4"    { id: 16, category: "Personal Care", icon: "💄", color: "#E1BEE7" },

    },    { id: 17, category: "Travel", icon: "✈️", color: "#00BCD4" },

    {    { id: 18, category: "Gifts & Donations", icon: "🎁", color: "#CDDC39" },

        category: "Refund",    { id: 19, category: "Events & Celebrations", icon: "🎉", color: "#FFC107" },

        icon: "💳",    { id: 20, category: "Pets", icon: "🐶", color: "#FF8A65" },

        color: "#F39C12"    { id: 21, category: "Maintenance & Repairs", icon: "🛠️", color: "#78909C" },

    },    { id: 22, category: "Business", icon: "🏢", color: "#1976D2" },

    {    { id: 23, category: "Investment", icon: "📈", color: "#388E3C" },

        category: "Food",    { id: 24, category: "Interest & Dividends", icon: "💹", color: "#00796B" },

        icon: "🍔",    { id: 25, category: "Bank Charges & Fees", icon: "🏦", color: "#5D4037" },

        color: "#EE3838"    { id: 26, category: "Legal & Professional Services", icon: "⚖️", color: "#424242" },

    },    { id: 27, category: "Other / Miscellaneous", icon: "📦", color: "#9E9E9E" },

    {];

        category: "Rent",=======

        icon: "🏠",    {

        color: "#0077B6"        category: "Salary",

    },        icon: "💰",

    {        color: "#19A23D"

        category: "Transport",    },

        icon: "🚌",    {

        color: "#03A791"        category: "Business",

    },        icon: "🏢",

    {        color: "#0077B6"

        category: "Shopping",    },

        icon: "🛒",    {

        color: "#D50B8B"        category: "Interest",

    },        icon: "💸",

    {        color: "#FF6F61"

        category: "Entertainment",    },

        icon: "🎮",    {

        color: "#3D74B6"        category: "Investment",

    },        icon: "📈",

    {        color: "#9B59B6"

        category: "Bill",    },

        icon: "🧾",    {

        color: "#EE3838"        category: "Gift",

    },        icon: "🎁",

    {        color: "#4ECDC4"

        category: "Healthcare",    },

        icon: "🏥",    {

        color: "#2ECC71"        category: "Refund",

    },        icon: "💳",

    {        color: "#F39C12"

        category: "Education",    },

        icon: "📚",    {

        color: "#8E44AD"        category: "Food",

    },        icon: "🍔",

    {        color: "#EE3838"

        category: "Other Income",    },

        icon: "📦",    {

        color: "#808080"        category: "Rent",

    },        icon: "🏠",

    {        color: "#0077B6"

        category: "Other Expense",    },

        icon: "📦",    {

        color: "#808080"        category: "Transport",

    },        icon: "🚌",

    // Additional categories from dev branch (with IDs for budget compatibility)        color: "#03A791"

    { id: 1, category: "Salary / Income", icon: "💵", color: "#4CAF50" },    },

    { id: 2, category: "Savings & Emergency Fund", icon: "💰", color: "#2196F3" },    {

    { id: 3, category: "Bills & Utilities", icon: "💡", color: "#FF9800" },        category: "Shopping",

    { id: 4, category: "Food & Beverages", icon: "🍔", color: "#FF5722" },        icon: "🛒",

    { id: 5, category: "Transportation", icon: "🚗", color: "#03A9F4" },        color: "#D50B8B"

    { id: 6, category: "Housing & Rent", icon: "🏠", color: "#795548" },    },

    { id: 7, category: "Shopping", icon: "🛍️", color: "#E91E63" },    {

    { id: 8, category: "Healthcare", icon: "🏥", color: "#F44336" },        category: "Entertainment",

    { id: 9, category: "Debt / Loan Payments", icon: "💳", color: "#9C27B0" },        icon: "🎮",

    { id: 10, category: "Taxes", icon: "💸", color: "#607D8B" },        color: "#3D74B6"

    { id: 11, category: "Insurance", icon: "🛡️", color: "#3F51B5" },    },

    { id: 12, category: "Education", icon: "🎓", color: "#009688" },    {

    { id: 13, category: "Entertainment", icon: "🎬", color: "#FF6F00" },        category: "Bill",

    { id: 14, category: "Subscriptions", icon: "📱", color: "#6A1B9A" },        icon: "🧾",

    { id: 15, category: "Clothing & Accessories", icon: "👔", color: "#8BC34A" },        color: "#EE3838"

    { id: 16, category: "Personal Care", icon: "💄", color: "#E1BEE7" },    },

    { id: 17, category: "Travel", icon: "✈️", color: "#00BCD4" },    {

    { id: 18, category: "Gifts & Donations", icon: "🎁", color: "#CDDC39" },        category: "Healthcare",

    { id: 19, category: "Events & Celebrations", icon: "🎉", color: "#FFC107" },        icon: "🏥",

    { id: 20, category: "Pets", icon: "🐶", color: "#FF8A65" },        color: "#2ECC71"

    { id: 21, category: "Maintenance & Repairs", icon: "🛠️", color: "#78909C" },    },

    { id: 22, category: "Business", icon: "🏢", color: "#1976D2" },    {

    { id: 23, category: "Investment", icon: "📈", color: "#388E3C" },        category: "Education",

    { id: 24, category: "Interest & Dividends", icon: "💹", color: "#00796B" },        icon: "📚",

    { id: 25, category: "Bank Charges & Fees", icon: "🏦", color: "#5D4037" },        color: "#8E44AD"

    { id: 26, category: "Legal & Professional Services", icon: "⚖️", color: "#424242" },    },

    { id: 27, category: "Other / Miscellaneous", icon: "📦", color: "#9E9E9E" },    {

];        category: "Other Income",

        icon: "📦",

export default CategoryIcons;        color: "#808080"

export type { iconType };    },

    {
        category: "Other Expense",
        icon: "📦",
        color: "#808080"
    }
]


// const CategoryIcons: iconType[] = [
//     {
//         category: "Salary",
//         icon: PaidIcon,
//         color: "teal",
//     },
//     {
//         category: "Business",
//         icon: StoreIcon,
//         color: "blue",
//     },
//     {
//         category: "Gift",
//         icon: CardGiftcardIcon,
//         color: "green",
//     },
//     {
//         category: "Interest",
//         icon: AccountBalanceIcon,
//         color: "red",
//     },
//     {
//         category: "Investment",
//         icon: CurrencyExchangeIcon,
//         color: "purple",
//     },
//     {
//         category: "Food",
//         icon: FastfoodIcon,
//         color: "orange",
//     },
//     {
//         category: "Transport",
//         icon: DirectionsBusIcon,
//         color: "#03A791",
//     },
//     {
//         category: "Rent",
//         icon: HouseIcon,
//         color: "brown",
//     },
//     {
//         category: "Shopping",
//         icon: ShoppingCartIcon,
//         color: "#D50B8B",
//     },
//     {
//         category: "Bill",
//         icon: ReceiptIcon,
//         color: "crimson",
//     },
//     {
//         category: "Entertainment",
//         icon: SportsEsportsIcon,
//         color: "#3D74B6"
//     },
//     {
//         category: "Other",
//         icon: MenuIcon,
//         color: "gray",
//     },
// ];
>>>>>>> Duplicate-Goal-GoalDetails_Frontend

export default CategoryIcons;
export type { iconType };