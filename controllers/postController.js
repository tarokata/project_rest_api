const { retriveFromPostList } = require('../models/postModel')

exports.errorHandler = function(err, req, res, next) {
    if (req.headerSent) {
        next(err)
    }
    res.status(500).send(JSON.stringify({ Error: err.Message }))
}

exports.getAllPosts = function(req, res, next) {
    let postList = []
    try {
        postList = JSON.parse(retriveFromPostList())
        res.setHeader("Content-Type", "application/json").send(postList)
    } catch (err) {
        next(err)
    }
}