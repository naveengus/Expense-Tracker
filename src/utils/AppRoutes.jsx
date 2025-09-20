import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./protectedRouter";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
import Transition from "../pages/Transition";
import Categories from "../pages/Categories";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

export default [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/home",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <Home />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/addIncome",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <AddIncome />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/addExpense",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <AddExpense />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/transition",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <Transition />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/categories",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <Categories />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/profile",
        element: (
            <>
                <ProtectedRoute>
                    <TopBar />
                    <Profile />
                    <Footer />
                </ProtectedRoute>
            </>
        )
    },
    {
        path: "/dashboard",
        element: (<>
            <ProtectedRoute>
                <TopBar />
                <Dashboard />
                <Footer />
            </ProtectedRoute>
        </>)
    }
]