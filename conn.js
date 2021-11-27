//importing mongoose in our application
const mongoose = require('mongoose')

//connecting mongodb to our application
mongoose.connect(
  'mongodb://localhost:27017/merncrud',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    if (error) {
      console.log('Error is there')
    } else {
      console.log('Connection established')
    }
  }
)

const dbobject = mongoose.connection

// below lines are just to check connection setup
dbobject.on('connected', () => {
  console.log('Mongo db connection Successfull')
})

dbobject.on('error', () => {
  console.log('Mongo db Setup Failed!!')
})

// here we have imported mongoose
module.exports = mongoose
