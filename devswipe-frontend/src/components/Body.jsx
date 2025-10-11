import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/slice/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.user);

  const fetchUser = async()=>{
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view",{withCredentials:true})
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401){
        navigate('/login');
      }
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div className='overlay overflow-y-auto'>
        <Navbar/>
        <Outlet/>
        {/* <Footer/> */}
    </div>
  )
}

export default Body