import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useEffect } from "react";
import { categoryIcons } from "../utils/Icons.jsx";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Home() {
    // Today values
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
    const currentDate = today.toISOString().slice(0, 10); // YYYY-MM-DD

    // States
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    // const [balance, setBalance] = useState("0")
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);

    const incomeWithType = income.map((inc) => ({ ...inc, type: "income" }));
    const expenseWithType = expense.map((exp) => ({ ...exp, type: "expense" }));

    const combined = [...incomeWithType, ...expenseWithType].sort(
        (a, b) => b._id.localeCompare(a._id) // latest first
    );




    const getData = async () => {
        try {
            const res = await AxiosService.get(ApiRoutes.GETINCOME.Path, { authenticate: true });
            setIncome(res);
            const totalIncome = res.reduce((sum, item) => sum + Number(item.amount), 0);
            setTotalIncome(totalIncome);
            const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, { authenticate: true });
            setExpense(resExpense);
            const totalExpense = resExpense.reduce((sum, item) => sum + Number(item.amount), 0);
            setTotalExpense(totalExpense)
        } catch (error) {
            console.error("Error fetching income:", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    // Dummy expenses
    // const expenses = [
    //     { id: 1, title: "Food", amount: 200, date: "2025-09-12" },
    //     { id: 2, title: "Movie", amount: 300, date: "2025-09-11" },

    // ];

    // Monthly Filter
    // const monthlyExpenses = expenses.filter(
    //     (exp) => exp.date.slice(0, 7) === selectedMonth
    // );

    // Range Filter
    // const rangeExpenses = expenses.filter(
    //     (exp) => exp.date >= fromDate && exp.date <= toDate
    // );

    return (
        <div className="pt-14 pb-18 ">
            <div className=" grid grid-cols-3 items-center p-3 text-center text-white  bg-gray-800">
                {/* fixed top-16 left-0 w-full  */}
                <div>
                    <p className="text-tiny mb-1 font-bold">Expense </p>
                    <span className="text-red-400 text-xl align-middle p-1">{totalExpense}</span><CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                </div>
                <div>
                    <p className="text-tiny mb-1 font-black">Income </p>
                    <span className="text-green-400 text-xl align-middle p-1">{totalIncome}</span><CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                </div>
                <div>
                    <p className="text-tiny mb-1 font-bold">Balance </p>
                    <span className="text-blue-400 text-xl align-middle p-1">{totalIncome - totalExpense}</span><CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                </div>

            </div>
            <hr />
            <div className="pt-3 ">
                <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>
                <hr className="my-5" />
            </div>

            <div className="mb-5 p-5 pt-2">
                <ul className="mt-3 space-y-2">
                    {combined.length > 0 ? (
                        combined.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center p-2 rounded-2xl shadow-sm bg-gray-50"
                            >
                                <div>
                                    <p className="flex justify-around px-2">{categoryIcons[item.category]}<span className="block font-medium px-2">{item.category}</span></p>
                                    <span className="text-xs text-gray-600 px-3">
                                        {new Date(item.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        }
                                    </span>
                                </div>
                                <span
                                    className={
                                        item.type === "income" ? "text-green-500 font-semibold pr-3" : "text-red-500 font-semibold pr-3"
                                    }
                                >
                                    {item.type === "income" ? "+ $" : "- $"}
                                    {item.amount}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No transactions for this month.</p>
                    )}
                </ul>


            </div>



        </div>
    );
}

export default Home;
