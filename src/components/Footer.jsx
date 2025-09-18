import React from 'react'
import { useNavigate } from 'react-router-dom'
function Footer() {
    const navigate = useNavigate()
    const handleIncome = () => {
        navigate("/addIncome")
    }
    const hanleExpense = () => {
        navigate("/addExpense")
    }
    return (
        <footer className='fixed bottom-0 left-0 w-full  text-white text-center'>
            <div className='flex justify-around'>
                <button className='border p-3 bg-red-400 rounded-3xl' onClick={hanleExpense}>- Expense</button>
                <button className='border p-3 bg-green-400 rounded-3xl' onClick={handleIncome}>+ Income</button>
            </div>

            <div className='grid grid-cols-4 gap-2 h-16 bg-gray-800'>
                <button>home</button>
                <button>transition</button>
                <button>categories</button>
                <button>profile</button>
            </div>

        </footer>
    )
}

export default Footer
