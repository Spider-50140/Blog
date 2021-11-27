// Here only we will add all the features like addpost,createpost,edit post and delete post (Basically CRUD operation)

const express = require('express')

// since we aren't writing everything in server.js but are making a separte file for this (this file post.js) so we need to take help of a external package called router after that we can write here everything and then export this whole thing to server.js
// with the help of this router only we will be creating all get and post routes
const router = express.Router()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postschema = new Schema({
  title: String,
  img: String,
  des: String,
  postid: String,
})

const PostModel = mongoose.model('posts', postschema)

router.post('/addnewpost', (req, res) => {
  const newpost = new PostModel({
    title: req.body.title,
    img: req.body.img,
    des: req.body.des,
    postid: req.body.postid,
  })

  newpost.save(function (error) {
    if (error) {
      res.send(error)
    } else {
      res.send('New post added successfully!!')
    }
  })
})

// this is to get data from mongodb and in postlist.js we have used axios.get therefore here router.get method is used
router.get('/getdata', (req, res) => {
  PostModel.find({}, function (doc, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

// Here we are going to look in mongodb database and search for all the details of a post with given unique id
router.post('/getpostdata', (req, res) => {
  // postmodel.find(x,y)
  // x- condition
  // y- callback function
  // now when postid parameter that we are sending to mongodb matches with one of the post its storing we will get all data of that post in fronend
  PostModel.find({ postid: req.body.postid }, function (doc, error) {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

// update post method in database
router.post('/updatedata', (req, res) => {
  PostModel.findOneAndUpdate(
    // first parameter here is condition which we are looking for so we pasted postid
    { postid: req.body.postid },
    //updating database with new values
    {
      title: req.body.title,
      img: req.body.img,
      des: req.body.des,
    },
    (error) => {
      if (error) {
        res.send(error)
      } else {
        res.send('Updated Successfully')
      }
    }
  )
})

// this is to delete a specific post in mongodb
router.post('/delete', (req, res) => {
  PostModel.findOneAndDelete(
    // first parameter here is condition which we are looking for so we pasted postid
    { postid: req.body.postid },
    (error) => {
      if (error) {
        res.send(error)
      } else {
        res.send('Updated Successfully')
      }
    }
  )
})

// as discussed we need to export this to server.js
module.exports = router
