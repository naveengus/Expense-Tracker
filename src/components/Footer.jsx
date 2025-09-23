import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function Footer() {
    const navigate = useNavigate()
    const handleIncome = () => {
        navigate("/addIncome")
    }
    const hanleExpense = () => {
        navigate("/addExpense")
    }
    return (
        <footer className='fixed bottom-0 left-0 w-full text-white text-center'>
            <div className='flex justify-evenly'>
                <button className='border p-3 bg-red-400 font-bold rounded-3xl' onClick={hanleExpense}>- Expense</button>
                <button className='border p-3 bg-green-400 font-bold rounded-3xl' onClick={handleIncome}>+ Income</button>
            </div>

            <div className='grid grid-cols-4 gap-2 h-16 bg-gray-800'>
                <button onClick={() => navigate('/home')} className='text-tiny'><HomeIcon /><br />Home</button>
                <button onClick={() => navigate('/transition')} className='text-tiny'><CreditScoreIcon /><br />Transition</button>
                <button onClick={() => navigate('/categories')} className='text-tiny'><CategoryIcon /><br />categories</button>
                <button onClick={() => navigate('/profile')} className='text-tiny'><ManageAccountsIcon /><br />profile</button>
            </div>

        </footer>
    )
}

export default Footer
