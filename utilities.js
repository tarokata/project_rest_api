const path = require('path')
const fs = require('fs')

const userPath = path.join(__dirname, '/database/users.json')

const userData = fs.readFileSync(userPath)
const userList = JSON.parse(userData)

const index = 4
const user = userList.find(user => user.userId === index)
console.log(user)
