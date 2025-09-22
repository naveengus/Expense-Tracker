import React, { useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { useEffect } from "react";

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
                    <p>Expense </p>
                    $ <span className="text-red-500 text-xl">{totalExpense}</span>
                </div>
                <div>
                    <p>Income </p>
                    $ <span className="text-green-500 text-xl">{totalIncome}</span>
                </div>
                <div>
                    <p>Balance </p>
                    $ <span className="text-blue-500 text-xl">{totalIncome - totalExpense}</span>
                </div>

            </div>
            <hr />

            {/* 🔹 Monthly Filter */}
            <div className="mb-5 p-5">
                {/* <h2 className="text-xl font-semibold">Monthly Filter</h2>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded mt-2"
                /> */}
                <hr className="my-5" />

                <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>

                <ul className="mt-3 space-y-2">
                    {combined.length > 0 ? (
                        combined.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center p-2 rounded-2xl shadow-sm bg-gray-50"
                            >
                                <div>
                                    <span className="block font-medium">{item.category}</span>
                                    <span className="text-xs text-gray-600">
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

{/* <ul className="mt-3 space-y-2">
    {monthlyExpenses.length > 0 ? (
        monthlyExpenses.map((exp) => (
            <li
                key={exp.id}
                className="flex justify-between border p-2 rounded shadow-sm"
            >
                <span>{exp.title}</span>
                <span className="text-red-500">- ${exp.amount}</span>
            </li>
        ))
    ) : (
        <p className="text-gray-500">No expenses for this month.</p>
    )}
</ul> 



  {/* 🔹 Range Filter */}
{/* <div>
    <h2 className="text-xl font-semibold">Date Range Filter</h2>
    <div className="flex gap-3 mt-2">
        <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
        />
        <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
        />
    </div>
    <ul className="mt-3 space-y-2">
        {rangeExpenses.length > 0 ? (
            rangeExpenses.map((exp) => (
                <li
                    key={exp.id}
                    className="flex justify-between border p-2 rounded shadow-sm"
                >
                    <span>{exp.title}</span>
                    <span className="text-red-500">- ${exp.amount}</span>
                </li>
            ))
        ) : (
            <p className="text-gray-500">No expenses in this range.</p>
        )}
    </ul>
</div> */}
