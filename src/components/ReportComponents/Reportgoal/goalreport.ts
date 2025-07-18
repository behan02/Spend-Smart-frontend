import { Style } from "@mui/icons-material";

interface Goal{
    name: string,
    date: Date,
    saved: number,
    progress: number,
}

const goalset: Goal[] = [
    {
        name: "Buy a phone",
        date: new Date("2024-12-30"),
        saved: 75000,
        progress: 75,
    },
    {
        name: "Go to a trip",
        date: new Date("2025-01-18"),
        saved: 2000,
        progress: 50,
    },
    {
        name: "Try pizza",
        date: new Date("2025-01-25"),
        saved: 2500,
        progress: 90,
    },
    {
        name: "Buy a laptop",
        date: new Date("2025-02-17"),
        saved: 10000,
        progress: 20,
    },
]

const colors: string[] = ["#023E8A","#19A23D","#EE3838"];

export {goalset,colors};
export type {Goal};