import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./protectedRouter";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
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