import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/LogOut";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HomeIcon from '@mui/icons-material/Home';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LockIcon from '@mui/icons-material/Lock';

function TopBar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full h-14 bg-amber-500 flex">
            <nav className=" text-black px-6 py-3 flex justify-between items-center w-full relative">

                <p className="flex items-center gap-2 text-xl font-bold ">
                    <CurrencyExchangeIcon sx={{ fontSize: 30 }} className="text-gray-700" />
                    <span className="text-gray-800 text-base md:text-xl lg:text-2xl">
                        Expense-Tracker
                    </span>                </p>

                {open && (
                    <div className="absolute top-14 right-0 h-120 w-50 shadow-lg  bg-gray-800 z-[1000]">
                        <div className=" text-white rounded-lg flex flex-col gap-4 p-4 ">
                            <Link to="/home" onClick={() => setOpen(false)}><HomeIcon className="mx-3" />Home</Link>
                            <Link to="/transition" onClick={() => setOpen(false)}><CreditScoreIcon className="mx-3" />Transition</Link>
                            <Link to="/categories" onClick={() => setOpen(false)}><CategoryIcon className="mx-3" />Categories</Link>
                            <Link to="/profile" onClick={() => setOpen(false)}><ManageAccountsIcon className="mx-3" />Profile</Link>
                            <Link to="/profile" onClick={() => setOpen(false)}><SettingsSuggestIcon className="mx-3" />Settings</Link>
                            <Link
                                className=" font-semibold"
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                            >
                                <LockIcon className="mx-3" /> Logout
                            </Link>
                        </div>
                    </div>

                )}

                <button onClick={() => setOpen(!open)}>
                    {open ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
                </button>
            </nav>
        </div>
    );
}

export default TopBar;
