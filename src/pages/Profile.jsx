import React from 'react'
import { logout } from '../utils/LogOut'
function Profile() {
    return (
        <div className="pt-14 pb-18 ">
            <div className='flex justify-center items-center m-5 pt-3' >
                <img className='size-30 rounded-full' src='https://t3.ftcdn.net/jpg/13/11/22/86/240_F_1311228699_YoiLc5aJ3RWz3uRfdEtlV0UYSQjqf7RW.jpg' />
            </div>
            <h1 className='text-center font-bold'>@ User Name</h1>
            <hr className="m-5 " />


            <h1 className='text-center'>Will Upadate Soon</h1>
        </div>
    )
}

export default Profile
