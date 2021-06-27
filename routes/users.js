const router = require('express').Router()

const { 
    getAllUsers, 
    getOneUser,
    createUserRecord, 
    updateUserRecord, 
    deleteUserRecord, 
    errorHandler
} = require('../controllers/userController')

router.get('/', getAllUsers, errorHandler)

router.get('/:userId', getOneUser, errorHandler)

router.post('/', createUserRecord, errorHandler)

router.put('/', updateUserRecord, errorHandler)

router.delete('/:userId', deleteUserRecord, errorHandler)

module.exports = router

