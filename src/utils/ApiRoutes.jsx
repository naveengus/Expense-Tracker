export default {
    SIGNUP: {
        Path: "/api/user/signup"
    },
    LOGIN: {
        Path: "api/user/login",
        auth: false
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