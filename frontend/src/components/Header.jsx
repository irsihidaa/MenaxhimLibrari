import React from 'react'
import{FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import{Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/slices/userSlice'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const handleLogout = () =>{
        dispatch(logoutUser());
        navigate('/');
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Library</Link>
        </div>
        <ul>
            {user ? (
                <li>
                <button className='btn' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
                </button>
                </li>
            ) : (
                <>
                <li>
                    <Link to='/login'><FaSignInAlt />Login</Link>
                </li>
                <li>
                    <Link to='/register'><FaUser />Register</Link>
                </li>
                </>
            ) }
        </ul>

    </header>
  )
}

export default Header
