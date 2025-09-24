import React, { useEffect, useState } from 'react'
import { logout } from '../utils/LogOut'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
function Profile() {
    const [name, setName] = useState("");
    const [profile, setProfile] = useState(null)
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const getData = async () => {
        try {
            let res = await AxiosService.get(ApiRoutes.GETUSER.Path, { authenticate: true })
            setName(res.data.name)
            setProfile(res.data.profilePicture)
            console.log(res)
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

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first!");
    }
    return (
        <div className="pt-14 pb-18 ">
            <div className="flex flex-col items-center gap-4 p-5">
                <img
                    className='size-30 rounded-full'
                    src={profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6C3rfEpNOVxSC9rPjZxVFXK5T2uTqkgyfE9AFxUmltQAP1-2hulbc91cwPo3wwH9lX04&usqp=CAU'}
                    alt='Profile'
                />
                <h1 className='text-center font-bold'>{name}</h1>

                {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}

                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Upload
                </button>
            </div>
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
