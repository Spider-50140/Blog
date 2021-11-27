import React, { useState } from 'react'
// this is to import uniqid package
import uniqid from 'uniqid'
// here we are importing axios
import axios from 'axios'
import { useHistory } from 'react-router'
//importing sweetalert
import Swal from 'sweetalert2'

function Addpost() {
  const [title, settitle] = useState('')
  const [img, setimg] = useState('')
  const [des, setdes] = useState('')

  const history = useHistory()

  function addpost(e) {
    e.preventDefault()

    var post = {
      title: title,
      img: img,
      des: des,
      postid: uniqid(),
    }

    // here post accepts 2 parameters first one is api link second is data which we want to send , then is success callback function and catch is error callback function
    // here we have written api as "/api/post/addnew" and now we will be creating this addnew route in backend
    axios
      .post('/api/post/addnewpost', post)
      .then((res) => {
        // alert(res.data)
        Swal.fire('Congrats', 'Your Post added Successfully!!')
        history.push('/')
      })
      .then((err) => console.error(err))

    settitle('')
    setimg('')
    setdes('')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6'>
        <div>
          <input
            type='text'
            placeholder='title'
            className='form-control'
            value={title}
            onChange={(e) => {
              settitle(e.target.value)
            }}
          />
          <input
            type='text'
            placeholder='Image'
            className='form-control'
            value={img}
            onChange={(e) => {
              setimg(e.target.value)
            }}
          />
          {/* in description we might need to add couple of lines so we uses textarea instead of input */}
          <textarea
            cols='30'
            rows='10'
            placeholder='Description'
            className='form-control'
            value={des}
            onChange={(e) => {
              setdes(e.target.value)
            }}
          ></textarea>
          <button className='btn btn-success float-left' onClick={addpost}>
            Add post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Addpost
