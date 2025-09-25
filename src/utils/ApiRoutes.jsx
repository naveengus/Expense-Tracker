export default {
    SIGNUP: {
        Path: "/api/user/signup"
    },
    LOGIN: {
        Path: "api/user/login",
        auth: false
    },
    GETUSER: {
        Path: "api/user/getUser",
        auth: true
    },
    UPDATEUSER: {
        Path: "api/user/updateUser",
        auth: true
    },
    INCOMECERATE: {
        Path: "/income/createIncome",
        auth: true
    },
    GETINCOME: {
        Path: "/income/getIncomes",
        auth: true
    },
    EXPENSECREATE: {
        Path: "/expense/createExpense",
        auth: true
    },
    GETEXPENSE: {
        Path: "/expense/getExpense",
        auth: true
    }
}