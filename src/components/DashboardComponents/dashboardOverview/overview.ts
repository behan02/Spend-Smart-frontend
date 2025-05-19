import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SavingsIcon from '@mui/icons-material/Savings';

export const overviewList = [
    {
        name: "Balance",
        color: "#CFCBF3",
        icon: AccountBalanceWalletIcon,
        difference: 0,
        key: "balance"
    },
    {
        name: "Income",
        color: "#CAE5D2",
        icon: AttachMoneyIcon,
        difference: 0,
        key: "income"
    },
    {
        name: "Expense",
        color: "#F5D0D1",
        icon: ShoppingCartIcon,
        difference: 0,
        key: "expense"
    },
    {
        name: "Savings",
        color: "#F3DAF4",
        icon: SavingsIcon,
        difference: 0,
        key: "savings"
    }
]