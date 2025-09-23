// icons.js
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MovieIcon from '@mui/icons-material/Movie';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import EvStationIcon from '@mui/icons-material/EvStation';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AttractionsIcon from '@mui/icons-material/Attractions';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
export const categoryIcons = {
    Income: <CurrencyRupeeIcon />,
    "House-Rent": <HomeIcon className="text-blue-500" />,
    Food: <LunchDiningIcon className="text-red-500" />,
    Shopping: <ShoppingBagIcon className="text-pink-500" />,
    Transport: <DirectionsBusIcon className="text-green-500" />,
    Movie: <MovieIcon className="text-gray-500" />,
    Petrol: <EvStationIcon className="text-amber-600" />,
    Internet: <SignalCellularAltIcon className="text-blue-500" />,
    Clothes: <DryCleaningIcon className="text-blue-500" />,
    Electricity: <TipsAndUpdatesIcon className="text-yellow-500" />,
    Netflix: <LocalMoviesIcon className="text-red-500" />,
    Sports: <SportsEsportsIcon className="text-gray-500" />,
    Entertainment: <AttractionsIcon className="text-orange-500" />,
    General: <NewLabelIcon className="text-green-500" />,
    Others: <LibraryAddIcon className="text-red-500" />,

    Salary: <PriceChangeIcon className="text-green-500" />,
    "Pocket-Money": <AccountBalanceWalletIcon className="text-violet-500" />,
    Freelance: <DisplaySettingsIcon className="text-blue-500" />

};
