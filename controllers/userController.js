const { retrieveFromUserList, writeToUserList }  = require('../models/userModel')

const findOneUser = function(userList, userId) {
    const userDetail = []
    if (!userList) return userDetail
    userDetail = userList.find(user => user.userId === Number(userId))
    return userDetail
}

const updateInfo = function(newInfo, oldInfo) {
    if (newInfo !== oldInfo) {
        oldInfo = newInfo
    }
}

exports.errorHandler = function(err, req, res, next) {
    if (res.headerSent) {
        return next(err)
    }
    res.status(500)
}

exports.getAllUsers = function(req, res, next) {
    let userList = []
    try {
        userList = JSON.parse(retrieveFromUserList())
        res.setHeader("Content-Type", "application/json")
        res.send(userList)
    } catch (err) {
        next(err)
    }
}

exports.getOneUser = function(req, res, next) {
    let userList = []
    const userId = req.params.userId

    try {
        userList = JSON.parse(retrieveFromUserList())
    } catch (err) {
        next(err)
    }

    try {
        const userDetail = findOneUser(userList, userId)
        if (!userDetail) {
            const err = new Error('User does not exist')
            err.status = 404
            throw err
        }
    } catch (err) {
        next(err)
    }
}

exports.createUserRecord = function(req, res, next) {
    const newUser = req.body

    let userList = JSON.parse(retrieveUserList())
    userList.push(newUser)
    writeToUserList(userList)

    res.writeHead(201, { 'Message': 'Successfully created user'})
    res.send(JSON.stringify(newUser))
}

exports.updateUserRecord = function(req, res, next) {
    const userId = req.body.userId
    const newUser = req.body
    let userList = []
    try {
        userList = retrieveFromUserList()
    } catch (err) {
        next(err)
    }

    const updatedUser = findOneUser(userList, userId)
    try {
        if (!updatedUser) {
            userList.push(newUser)
            fs.writeFileSync(userPath, JSON.stringify(userList))
            res.writeHead(201, { 'Message': 'Successfully created new user'})
            res.send(JSON.stringify(newUser))
        } else {
            updateInfo(newUser.userId, updateInfo.userId)
            updateInfo(newUser.firstName, updateInfo.firstName)
            updateInfo(newUser.lastName, updateInfo.lastName)
            updateInfo(newUser.career, updateInfo.career)
        }
    } catch (err) {
        next(err)
    }
}

exports.deleteUserRecord = function(req, res, next) {
    const userId = req.params.id
    const userList = []

    try {
        userList = retrieveFromUserList()
    } catch (err) {
        next(err)
    }

    const userDeleted = findOneUser(userList, userId)
    try {
        if (!userDeleted) {
            const err = new Error('User not found')
            err.status = 404
            throw err
        } else {
            const newUserList = userList.filter(user => user.id !== userDeleted.id)
            writeToUserList(newUserList)
            res.send(userDeleted)
        }
    } catch (err) {
        next(err)
    }
}
