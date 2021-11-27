import React, { useEffect } from 'react'
// since we are using Link we need to use react router dom
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router'
// below 2 lines are for importing aos animation
import AOS from 'aos'
import 'aos/dist/aos.css'

function Postitem({ post }) {
  var { title, img, des, postid } = post

  const history = useHistory()

  // everytime page renders we will be using this effect
  useEffect(() => {
    AOS.init()
  }, [])

  function deletepost(postid) {
    axios
      .post('/api/post/delete', { postid: postid })
      .then((res) => {
        console.log(res)
        alert(res.data)
        // to refresh the page
        history.go(0)
      })
      .catch((err) => console.error(err))
  }

  return (
    // here we have used bootstrap class to give shadow effect ,col-md-8 means out of 12 col we are only going to use 8 for every new component
    //data-aos='fade-up' is for animation purpose we can look for different animation in https://michalsnik.github.io/aos/
    <div class='col-md-8 shadow p-3 mb-5 bg-white rounded' data-aos='fade-up'>
      <h2 className='p-1'>{title}</h2>
      {/* we have used img-fluid so that all images get equal size  and we have also used style then height and width  and p-1 is for margin */}
      <img
        style={{ height: '300px', width: '300px' }}
        src={img}
        className='img-fluid'
      />
      <p className='p-1 '>{des}</p>
      {/* what we want now is to edit each post so for that we will be needing unique id of that post and with that unique id we will be moving to editpost.js so when user will click on edit post then we will move to editpost component with unique id that's why this statement - to={`/edit/${postid}`} */}
      <Link to={`/edit/${postid}`}>
        <li className='btn btn-primary'>Edit </li>{' '}
      </Link>
      {/* <button className='btn btn-info'>Edit</button> */}
      <button
        className='btn btn-danger'
        onClick={() => {
          deletepost(postid)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default Postitem
