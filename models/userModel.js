const path = require('path')
const fs = require('fs')

const userPath = path.join(__dirname, '../', '/database/users.json')
const unfoundPath = '../file_not_found'

exports.retrieveFromUserList = () => fs.readFileSync(userPath, function(err) { err.Message = 'User list is Empty'}) 

exports.writeToUserList = userList => fs.writeFileSync(userPath, JSON.stringify(userList))
