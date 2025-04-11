import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SavingsIcon from '@mui/icons-material/Savings';

export const overviewList = [
    {
        name: "Balance",
        amount: 7400,
        color: "#CFCBF3",
        difference: 2000,
        icon: AccountBalanceWalletIcon,
    },
    {
        name: "Income",
        amount: 20000,
        color: "#CAE5D2",
        difference: 2000,
        icon: AttachMoneyIcon,
    },
    {
        name: "Expense",
        amount: 12600,
        color: "#F5D0D1",
        difference: 2000,
        icon: ShoppingCartIcon,
    },
    {
        name: "Savings",
        amount: 2000,
        color: "#F3DAF4",
        difference: -2000,
        icon: SavingsIcon,
    }
]