import React from 'react'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
function AddExpense() {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const expense = {
            amount: formData.get("amount"),
            date: formData.get("date"),
            category: formData.get("category"),
            notes: formData.get("notes"),
        }
        try {
            let res = await AxiosService.post(ApiRoutes.EXPENSECREATE.Path, expense, { authenticate: true });
            console.log(res);

            alert(res.message || "Expense added successfully")
            navigate("/home")
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Internal Server Error");
        }
    }
    return (
        <div className='pt-16 pb-18'>

            <h1 className="text-xl font-bold mb-4 py-2 text-center m-3 text-red-400">Add Your Expense </h1>
            <hr className="m-5 " />

            <form className="space-y-4 m-5 p-5 rounded-2xl bg-gray-50" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold mb-4 py-2 text-center m-3 text-gray-400">Add Your Expense </h1>

                <div>
                    <label className="block text-sm font-medium text-gray-900">
                        Amount
                    </label>
                    <input
                        type="number"
                        name='amount'
                        placeholder="$ 100"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Date</label>
                    <input
                        type="date"
                        name='date'
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
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="house-rent">House Rent</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="petrol">Petrol</option>
                        <option value="internet">Internet</option>
                        <option value="clothes">Clothes</option>
                        <option value="shopping">Shopping</option>
                        <option value="electricity">Electricity Bill</option>
                        <option value="movie">Movie</option>
                        <option value="netflix">Netflix</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="general">General</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">
                        Notes
                    </label>
                    <input
                        type="text"
                        name='notes'
                        placeholder="Write a note..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 text-center">
                    <button
                        type="submit"
                        className="mt-4 w-28 rounded-md bg-red-600  py-2 text-white hover:bg-red-700"
                    >
                        Add Expense
                    </button>
                    <button
                        type="reset"
                        className="mt-4 w-28 rounded-md bg-gray-600  py-2 text-white hover:bg-gray-700"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddExpense
