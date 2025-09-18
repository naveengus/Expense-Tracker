import React, { useState } from "react";

function Home() {
    // Today values
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
    const currentDate = today.toISOString().slice(0, 10); // YYYY-MM-DD

    // States
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);

    // Dummy expenses
    const expenses = [
        { id: 1, title: "Food", amount: 200, date: "2025-09-12" },
        { id: 2, title: "Movie", amount: 300, date: "2025-09-11" },
        { id: 3, title: "Travel", amount: 500, date: "2025-08-20" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
        { id: 4, title: "Shopping", amount: 150, date: "2025-09-01" },
    ];

    // Monthly Filter
    const monthlyExpenses = expenses.filter(
        (exp) => exp.date.slice(0, 7) === selectedMonth
    );

    // Range Filter
    const rangeExpenses = expenses.filter(
        (exp) => exp.date >= fromDate && exp.date <= toDate
    );

    return (
        <div className="pt-16 pb-18">
            <div className=" grid grid-cols-3 items-center p-3 text-center text-white  bg-gray-800">
                {/* fixed top-16 left-0 w-full  */}
                <div>
                    <p>Expense </p>
                    $ <span className="text-red-500 text-xl">2000</span>
                </div>
                <div>
                    <p>Income </p>
                    $ <span className="text-green-500 text-xl">5000</span>
                </div>
                <div>
                    <p>Balance </p>
                    $ <span className="text-blue-500 text-xl">3000</span>
                </div>

            </div>
            <hr />

            {/* 🔹 Monthly Filter */}
            <div className="mb-5 p-5">
                <h2 className="text-xl font-semibold">Monthly Filter</h2>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded mt-2"
                />
                <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>

                <ul className="mt-3 space-y-2">
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
            </div>

            <hr className="my-5" />

            {/* 🔹 Range Filter */}
            <div>
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
            </div>
        </div>
    );
}

export default Home;
