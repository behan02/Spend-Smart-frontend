interface Budget {
    name: string;
    status: string;
    progress: number;
}

const budgetset: Budget[] = [
    {
        name: "Food",
        status: "LKR 15000/20000",
        progress: 75
    },
    {
        name: "Transportation",
        status: "LKR 6000/12000",
        progress: 50
    },
    {
        name: "Bills",
        status: "LKR 7000/8000",
        progress: 80
    },
    {
        name: "Shopping",
        status: "LKR 2000/8000",
        progress: 25
    }
]

export {budgetset};
export type { Budget };