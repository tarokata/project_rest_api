const express = require('express')
const app = express()

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

app.use('/users', usersRouter)
app.use('/posts', postsRouter)

const PORT = process.env.PORT || '8080'
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))