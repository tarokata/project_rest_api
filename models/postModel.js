const path = require('path')
const fs = require('fs')

const postPath = path.join(__dirname, '../', '/database/posts.json')

exports.retrieveFromPostList = () => fs.readFileSync(postPath, function(err) { err.Message = 'Post list is Empty'}) 
