import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
// below file is for animated alert
import Swal from 'sweetalert2'
function EditPost() {
  const [title, settitle] = useState('')
  const [img, setimg] = useState('')
  const [des, setdes] = useState('')

  // after updating our content we want to move to homepage so this hook is necessary
  const history = useHistory()

  //Use params is used to retrieve parameter from URL
  const params = useParams()

  // useeffect hook gets activated when we load the page so when user will click on edit button in postlist component he will be redirected to this file and everything inside useeffect will be done
  useEffect(() => {
    // here we are making a request to backend to get the data of unique postid we are sending
    axios
      .post('/api/post/getpostdata', { postid: params.postid })
      .then((res) => {
        console.log(res.data[0])
        const { title, des, img, postid } = res.data[0]
        settitle(title)
        setimg(img)
        setdes(des)
      })
      .catch((err) => console.error(err))
  }, [])

  // when user will click on update and save button we will update data in backend using this function
  function editpost(e) {
    e.preventDefault()

    const updatepost = {
      title: title,
      img: img,
      des: des,
      postid: params.postid,
    }

    axios
      .post('/api/post/updatedata', updatepost)
      .then((res) => {
        console.log(res.data)
        // alert(res.data)
        // this is done to give animation affect on alert
        Swal.fire('Congrats', 'Updated Successfully!!')
        // after updating we will be rediected to home page
        history.push('/')
      })
      .catch((err) => console.error(err))
  }

  return (
    // copied this whole div from addpost
    <div className='row justify-content-center'>
      <h1> Edit-Your Post </h1>
      {/* // we are just trying to print the postid in webpage */}
      {/* <h2>{params.postid}</h2> */}
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
          <button className='btn btn-success float-left' onClick={editpost}>
            Update and Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPost
