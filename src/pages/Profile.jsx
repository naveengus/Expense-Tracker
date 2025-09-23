import React, { useEffect, useState } from 'react'
import { logout } from '../utils/LogOut'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
function Profile() {
    const [name, setName] = useState("");
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const getData = async () => {
        try {
            let res = await AxiosService.get(ApiRoutes.GETUSER.Path, { authenticate: true })
            setName(res.data.name)
            const resIncome = await AxiosService.get(ApiRoutes.GETINCOME.Path, { authenticate: true });
            setIncome(resIncome);
            const totalIncome = resIncome.reduce((sum, item) => sum + Number(item.amount), 0);
            setTotalIncome(totalIncome);
            const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, { authenticate: true });
            setExpense(resExpense);
            const totalExpense = resExpense.reduce((sum, item) => sum + Number(item.amount), 0);
            setTotalExpense(totalExpense)
        } catch (error) {
            console.error("Error fetching name:", error);

        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="pt-14 pb-18 ">
            <div className='flex justify-center items-center m-5 pt-3' >
                <img className='size-30 rounded-full' src='https://t3.ftcdn.net/jpg/13/11/22/86/240_F_1311228699_YoiLc5aJ3RWz3uRfdEtlV0UYSQjqf7RW.jpg' />
            </div>
            <h1 className='text-center font-bold'>{name}</h1>
            <hr className="m-5 " />
            <div className='text-center text-xl '>
                <h1 className='text-gray-600 pb-3 pt-5 font-bold'>Total Income = <span className='pl-10 text-green-500 '>{totalIncome}</span></h1>
                <h1 className='text-gray-600 pb-3 font-bold'>Total Expense = <span className='pl-10 text-red-500 '>{totalExpense}</span></h1>

                <hr className="mx-20 my-5" />

                <h1 className='text-gray-600 pb-3 pl-10 ml-3 font-bold'>Balance = <span className='pl-10 text-blue-500 '>{totalIncome - totalExpense}</span></h1>
            </div>
            <div className='mt-10 flex justify-center'>
                <button className='bg-orange-300 p-2 rounded-2xl '>Delete All Transition </button>
            </div>
            <p className='text-center pt-3'>Will Update SOON </p>
        </div>
    )
}

export default Profile
