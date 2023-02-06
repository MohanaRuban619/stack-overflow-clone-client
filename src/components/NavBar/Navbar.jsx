import React , { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../src/assets/logo.png'
import Search from '../../assets/search.png'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import decode from 'jwt-decode'
import './Navbar.css' 
import { useSelector, useDispatch } from 'react-redux'
import currentUserReducer from '../../reducers/currentUser'
import { setCurrentUser } from '../../actions/CurrentUser'

export const Navbar = () => {

  var User = useSelector( (state) => (state.currentUserReducer));
  console.log(User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{
    const token = User?.token
    if(token){
      const decodedTokens = decode(token)
      if (decodedTokens.exp * 1000 < new Date().getTime()){
        handleLogOut()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])
  const handleLogOut = () => {
    dispatch({type : 'LOGOUT'});
    alert('Session has Time Out')
    navigate('/')
    dispatch(setCurrentUser(null))
  }
  
  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-btn'>
                <img src={logo} alt= 'logo' height={30}/>
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form >
                <input type="text" placeholder='Search.....'/>
                <img src={Search} alt="" width={18} className='search-icon'/>
            </form>
            {User === null ? 
                <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
                <>
                    <Avatar backgroundColor='#009dff' px="10px" py="10px" borderRadius="50%" color="white"><Link to={`/Users/${User?.result._id}`} style={{color:"white",textDecoration :"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
                </>    
            }
        </div>
    </nav>
  )
}


