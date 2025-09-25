import React, { useEffect, useState } from 'react';
import { logout } from '../utils/LogOut';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

function Profile() {
    const [name, setName] = useState('');
    const [profile, setProfile] = useState(null);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Fetch user and transactions
    const getData = async () => {
        try {
            const res = await AxiosService.get(ApiRoutes.GETUSER.Path, { authenticate: true });
            setName(res.data.name);
            setProfile(res.data.profilePicture);

            const resIncome = await AxiosService.get(ApiRoutes.GETINCOME.Path, { authenticate: true });
            setIncome(resIncome);
            setTotalIncome(resIncome.reduce((sum, item) => sum + Number(item.amount), 0));

            const resExpense = await AxiosService.get(ApiRoutes.GETEXPENSE.Path, { authenticate: true });
            setExpense(resExpense);
            setTotalExpense(resExpense.reduce((sum, item) => sum + Number(item.amount), 0));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    // Handle update (name + profile picture)
    const handleUpload = async () => {
        if (!file && !name) return alert('Nothing to update!');

        const formData = new FormData();
        if (file) formData.append('profilePicture', file);
        formData.append('name', name);

        try {
            const res = await AxiosService.put(ApiRoutes.UPDATEUSER.Path, formData, {
                authenticate: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // console.log('Upload Success:', res);
            alert('Profile updated!');
            setFile(null);
            setPreview('');
            setEditMode(false); // close edit mode after saving
            getData(); // Refresh updated profile
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Upload failed!');
        }
    };

    return (
        <div className="pt-14 pb-18">
            <div className="flex flex-col items-center gap-4 p-5">
                <img
                    className="size-30 rounded-full"
                    src={
                        preview ||
                        (profile ? (profile.startsWith("http") ? profile : `http://localhost:4000/${profile}`) : 'default.jpg')
                    } alt="Profile"
                />
                <h1>{name}</h1>
                {editMode && (
                    <>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            className="border-b p-2 rounded"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </>
                )}

                <Button onClick={() => setEditMode(!editMode)}>
                    <EditIcon />
                    {editMode ? "Cancel" : "Edit Profile"}
                </Button>
            </div>

            <hr className="m-5" />

            <div className="text-center text-xl">
                <h1 className="text-gray-600 pb-3 pt-5 font-bold">
                    Total Income = <span className="pl-10 text-green-500">{totalIncome}</span>
                </h1>
                <h1 className="text-gray-600 pb-3 font-bold">
                    Total Expense = <span className="pl-10 text-red-500">{totalExpense}</span>
                </h1>

                <hr className="mx-20 my-5" />

                <h1 className="text-gray-600 pb-3 pl-10 ml-3 font-bold">
                    Balance = <span className="pl-10 text-blue-500">{totalIncome - totalExpense}</span>
                </h1>
            </div>

            <div className="mt-10 flex justify-center">
                <button className="bg-orange-300 p-2 rounded-2xl">Delete All Transition</button>
            </div>
            <p className="text-center pt-3">Will Update SOON</p>
        </div>
    );
}

export default Profile;
