 import bcryptjs from 'bcryptjs'

 const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcryptjs.hashSync(process.env.USER_PASSWORD, 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcryptjs.hashSync(process.env.USER_PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcryptjs.hashSync(process.env.USER_PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "Cryton Sibanda",
        email: "admin@example.com",
        password: bcryptjs.hashSync(process.env.USER_PASSWORD, 10),
        isAdmin: true
    }
]

export default users