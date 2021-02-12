 import bcryptjs from 'bcryptjs'

 const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Cryton Sibanda",
        email: "cryton@example.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true
    }
]

export default users