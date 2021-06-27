const router = require('express').Router()

const { getAllPosts, errorHandler } = require('../controllers/postController')

router.get('/', getAllPosts, errorHandler)

module.exports = router