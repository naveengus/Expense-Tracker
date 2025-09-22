import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";

function Transition() {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [view, setView] = useState("income"); // 👈 default: income

    const getData = async () => {
        try {
            const res = await AxiosService.get(ApiRoutes.GETINCOME.Path, {
                authenticate: true,
            });
            setIncome(res);
            const totalIncome = res.reduce(
                (sum, item) => sum + Number(item.amount),
                0
            );
            setTotalIncome(totalIncome);

            const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, {
                authenticate: true,
            });
            setExpense(resExpense);
            const totalExpense = resExpense.reduce(
                (sum, item) => sum + Number(item.amount),
                0
            );
            setTotalExpense(totalExpense);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // add type
    const incomeWithType = income.map((inc) => ({ ...inc, type: "income" }));
    const expenseWithType = expense.map((exp) => ({ ...exp, type: "expense" }));

    // combined
    const combined = [...incomeWithType, ...expenseWithType].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // filter by month
    const filtered = combined.filter(
        (item) => item.date.slice(0, 7) === selectedMonth
    );

    // show only income or expense
    const displayed = filtered.filter((item) => item.type === view);

    return (
        <div className="pt-16 pb-18">
            <h1 className="text-center font-bold text-lg ">Transactions</h1>

            {/* 🔹 Month Filter */}
            <div className="mb-5 mr-5 flex justify-end">

                {/* <h2 className="text-xl font-semibold">Monthly Filter</h2> */}
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded mt-2"
                />
            </div>

            <hr className="my-3 mx-5" />

            {/* 🔹 Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={() => setView("income")}
                    className={`px-4 py-2 rounded-lg ${view === "income"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Income
                </button>
                <button
                    onClick={() => setView("expense")}
                    className={`px-4 py-2 rounded-lg ${view === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Expense
                </button>
            </div>

            {/* 🔹 Transaction List */}
            <ul className="mt-3 space-y-2 mx-3">
                {displayed.length > 0 ? (
                    displayed.map((item) => (
                        <li
                            key={item._id}
                            className="flex justify-between items-center p-3 rounded-2xl shadow-sm bg-gray-50"
                        >
                            <div>
                                <span className="block font-medium">{item.category}</span>
                                <span className="text-xs text-gray-600">
                                    {new Date(item.date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <span
                                className={
                                    item.type === "income"
                                        ? "text-green-500 font-semibold pr-3"
                                        : "text-red-500 font-semibold pr-3"
                                }
                            >
                                {item.type === "income" ? "+ $" : "- $"}
                                {item.amount}
                            </span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">
                        No {view} transactions for this month.
                    </p>
                )}
            </ul>
        </div>
    );
}

export default Transition;
