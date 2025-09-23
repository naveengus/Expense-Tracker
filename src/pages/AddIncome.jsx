import React from "react";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../utils/ApiRoutes";
import AxiosService from "../utils/AxiosService";

function AddIncome() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const incomeData = {
            amount: formData.get("amount"),
            date: formData.get("date"),
            category: formData.get("category"),
            notes: formData.get("notes"),
        };

        try {
            let res = await AxiosService.post(ApiRoutes.INCOMECERATE.Path, incomeData, { authenticate: true });
            console.log(res);
            alert(res.message || "Income added successfully");
            navigate("/home");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Internal Server Error");
        }
    };

    return (
        <div className="pt-16 pb-18">
            <h1 className="text-xl font-bold mb-4 py-2 m-3 text-center text-green-400">
                Add Your Income
            </h1>
            <hr className="m-5 " />

            <form className="space-y-4 m-5 p-5 rounded-2xl bg-gray-50" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold mb-4 py-2 m-3 text-center text-gray-400">
                    Add Your Income
                </h1>
                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">
                        Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="$ 100"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="Salary">Salary</option>
                        <option value="Pocket-Money">Pocket Money</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">
                        Notes
                    </label>
                    <input
                        type="text"
                        name="notes"
                        placeholder="Write a note..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 text-center">
                    <button
                        type="submit"
                        className="mt-4 w-28 rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
                    >
                        Add Income
                    </button>
                    <button
                        type="reset"
                        className="mt-4 w-28 rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddIncome;
