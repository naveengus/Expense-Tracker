import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { categoryIcons } from "../utils/Icons.jsx";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#FF6384",
];

function Categories() {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const [expense, setExpense] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    const getData = async () => {
        try {
            const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, {
                authenticate: true,
            });

            setExpense(resExpense);

            // Total only for selected month
            const filtered = resExpense.filter(
                (item) => item.date.slice(0, 7) === selectedMonth
            );
            const total = filtered.reduce(
                (sum, item) => sum + Number(item.amount),
                0
            );
            setTotalExpense(total);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [selectedMonth]);

    // Group by category (instead of mapping directly)
    const filtered = expense.filter(
        (item) => item.date.slice(0, 7) === selectedMonth
    );

    const categoryTotals = {};
    filtered.forEach((item) => {
        const amt = Number(item.amount);
        if (categoryTotals[item.category]) {
            categoryTotals[item.category] += amt;
        } else {
            categoryTotals[item.category] = amt;
        }
    });

    // Convert to chart data with percentage
    const filteredData = Object.entries(categoryTotals).map(
        ([category, amt]) => ({
            name: category,
            value: Number(((amt / totalExpense) * 100).toFixed(1)),
        })
    );

    return (
        <div className="pt-14 pb-18">
            <h1 className="text-xl font-bold mb-4 mt-3 text-center">
                Expense Categories
            </h1>

            <div className="flex justify-center mb-5">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>

            <div className="flex justify-center mt-2 mb-2 z-0">
                <PieChart width={350} height={250} className="flex justify-center text-tiny rounded-2xl bg-gray-300 relative  z-[-1000]">
                    <Pie
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        width={150}
                        innerRadius={20}
                        outerRadius={60}
                        paddingAngle={1}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    // label={({ name, value }) => `${name} ${value}%`}
                    >
                        {filteredData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        className="pl-3"
                    />
                </PieChart>
            </div>
            <hr className="mx-6" />
            <div className="mb-5 p-5">
                <ul className="mt-3 space-y-2">
                    {filtered.length > 0 ? (
                        filtered
                            .map((item) => ({
                                ...item,
                                percent: ((item.amount / totalExpense) * 100).toFixed(1),
                            }))
                            .sort((a, b) => b.percent - a.percent) // high to low
                            .map((item) => (
                                <li
                                    key={item._id}
                                    className="flex justify-between items-center p-2 rounded-2xl shadow-sm bg-gray-50"
                                >
                                    <div>
                                        <p className="flex items-center px-2">
                                            {categoryIcons[item.category]}
                                            <span className="block font-medium px-2">{item.category}</span>
                                        </p>
                                        <span className="text-xs text-gray-600 px-3">{item.name}</span>
                                    </div>
                                    <span className="font-semibold">{item.percent}%</span>
                                </li>
                            ))
                    ) : (
                        <p className="text-center text-gray-500">No expenses</p>
                    )}
                </ul>

            </div>

        </div>
    );
}

export default Categories;
