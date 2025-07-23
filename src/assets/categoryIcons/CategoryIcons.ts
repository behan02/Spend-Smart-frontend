import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from '@mui/icons-material/Store';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HouseIcon from '@mui/icons-material/House';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

interface iconType{
    category: string;
    // icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    //     muiName: string;
    // }
    // color: string;
    icon: string;
    color: string;
}

const CategoryIcons: iconType[] = [
    {
        category: "Salary",
        icon: "💰",
        color: "#19A23D"
    },
    {
        category: "Business",
        icon: "🏢",
        color: "#0077B6"
    },
    {
        category: "Interest",
        icon: "💸",
        color: "#FF6F61"
    },
    {
        category: "Investment",
        icon: "📈",
        color: "#9B59B6"
    },
    {
        category: "Gift",
        icon: "🎁",
        color: "#4ECDC4"
    },
    {
        category: "Refund",
        icon: "💳",
        color: "#F39C12"
    },
    {
        category: "Food",
        icon: "🍔",
        color: "#EE3838"
    },
    {
        category: "Rent",
        icon: "🏠",
        color: "#0077B6"
    },
    {
        category: "Transport",
        icon: "🚌",
        color: "#03A791"
    },
    {
        category: "Shopping",
        icon: "🛒",
        color: "#D50B8B"
    },
    {
        category: "Entertainment",
        icon: "🎮",
        color: "#3D74B6"
    },
    {
        category: "Bill",
        icon: "🧾",
        color: "#EE3838"
    },
    {
        category: "Healthcare",
        icon: "🏥",
        color: "#2ECC71"
    },
    {
        category: "Education",
        icon: "📚",
        color: "#8E44AD"
    },
    {
        category: "Other Income",
        icon: "📦",
        color: "#808080"
    },
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

export default CategoryIcons;
export type { iconType };