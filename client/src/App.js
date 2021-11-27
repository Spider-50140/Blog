import logo from './logo.svg'
import './App.css'
import Postitem from './postitem'
import PostList from './Postlist'
import Addpost from './Addpost'
import EditPost from './Editpost'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <h1 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
        MERN CRUD Application
      </h1>
      <BrowserRouter>
        <Route path='/' component={PostList} exact />
        <Route path='/add' component={Addpost} exact />
        {/* if we wan to go to edit post then we need postid of that post so this statement - path='/edit/:postid' */}
        <Route path='/edit/:postid' component={EditPost} exact />
        <Route path='/post' component={Postitem} exact />
      </BrowserRouter>
    </div>
  )
}

export default App
