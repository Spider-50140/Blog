import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Postitem from './postitem'

//here only we will be retreiving data from database using react hook useeffect(as its called automatically whenever we load the page or add any component  and thus everything we write inside of it will be called and then displayed on our webpage )

function PostList() {
  // this is to store the data we recieved from database
  const [pdata, setpdata] = useState([])

  useEffect(() => {
    axios
      .get('/api/post/getdata')
      .then((res) => {
        console.log(res.data)
        setpdata(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  //now we will loop through pdata and for every item we will call a postitem component

  // Basically here for every single item we are calling postitem component and passing values like title,img,des and then in postitem copmponent(postitem.js) we have written how to arrange that data so after postitem arranges that data we are storing that arranged data in postlist one by one , for exampele if in our pdata we have 3 items so we will call postitem 3 times and everytime that data will get arranged in correct css order(logic of that is written in postitem.js) and in the end postlist will have 3 items in a beautiful structured order so below we have just written <div>{postlist}</div>

  const postlist = pdata.map((i) => {
    return (
      // In Bootstrap, the "row" class is used mainly to hold columns in it. and
      // justify-content-center is to center everything in between
      <div className='row justify-content-center'>
        <Postitem post={i} />
      </div>
    )
  })

  return (
    <div>
      <a href='/add' className='btn btn-primary' style={{ margin: '10px' }}>
        Add Post
      </a>
      {postlist}
    </div>
  )
}

export default PostList
