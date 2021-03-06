const express = require('express')
const app = express()

//below line is to connect conn.js to server.js
const dbfile = require('./conn')

const mmodel = require('./routes/post')

const bodyParser = require('body-parser')
const path = require('path')
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())

// How can we call test method we made in post.js ?
// we have to tell compiler that whenever url is containing a specific keyword go to post.js
// now here whenever in url we will write /api/post it will got to post.js

app.use('/api/post', mmodel)

if (process.env.NODE_ENV == 'production') {
  app.use('/'), express.static('client/build')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client/build/index.html'))
  })
}
const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log('Server started Successfully!!')
})
