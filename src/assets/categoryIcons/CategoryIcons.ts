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
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

interface iconType{
    category: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
    color: string;
}


const CategoryIcons: iconType[] = [
    {
        category: "Salary",
        icon: PaidIcon,
        color: "teal",
    },
    {
        category: "Business",
        icon: StoreIcon,
        color: "blue",
    },
    {
        category: "Gift",
        icon: CardGiftcardIcon,
        color: "green",
    },
    {
        category: "Interest",
        icon: AccountBalanceIcon,
        color: "red",
    },
    {
        category: "Investment",
        icon: CurrencyExchangeIcon,
        color: "purple",
    },
    {
        category: "Food",
        icon: FastfoodIcon,
        color: "orange",
    },
    {
        category: "Transport",
        icon: DirectionsBusIcon,
        color: "#03A791",
    },
    {
        category: "Rent",
        icon: HouseIcon,
        color: "brown",
    },
    {
        category: "Shopping",
        icon: ShoppingCartIcon,
        color: "#D50B8B",
    },
    {
        category: "Bill",
        icon: ReceiptIcon,
        color: "crimson",
    },
    {
        category: "Other",
        icon: MenuIcon,
        color: "gray",
    },
];

export default CategoryIcons;
export type { iconType };