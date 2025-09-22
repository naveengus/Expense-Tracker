import React from 'react'
import { logout } from '../utils/LogOut'
function TopBar() {
    return (
        <div className='fixed top-0 left-0 w-full h-16 bg-amber-500 flex'>
            <p className='p-3 text-xl'>Expense-Tracker</p>
            <button className='bg-red-400 rounded-2xl p-1 m-3 ' onClick={() => logout()}>Logout</button>

        </div>
    )
}

export default TopBar
