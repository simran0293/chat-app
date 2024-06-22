import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setUser, setsocketConnection } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/LogoNew.png'
import io from 'socket.io-client'


const Home = () => {

  const user = useSelector(state=>state.user)
  console.log("user",user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails=async()=>{
      try{
          const URL=`${process.env.REACT_APP_BACKEND_URL}/api/user-details`

          const response = await axios({
              url: URL,
              withCredentials: true,

          })

          dispatch(setUser(response?.data.data))

          if(response.data.logout)
            {
              dispatch(logout())
              navigate("/email")
            }

          console.log("current user details",response)
      }catch(error){
          console.log("error",error)
      }
  }

  useEffect(()=>{
    fetchUserDetails();
  },[])

  // socket connection
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth:{
        token: localStorage.getItem('token')
      }
    })

    socketConnection.on('onlineUser',(data)=>{
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setsocketConnection(socketConnection))

    return()=>{
      socketConnection.disconnect(socketConnection); 
    }

  },[])


  // console.log("location",location);
  const basePath = location.pathname === '/'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`} >
       <Sidebar/>
      </section>

    {/* message component */}
    <section className={`${basePath && "hidden"}`}>
      <Outlet/>
    </section>

    <div className={` flex-col justify-center items-center gap-2 hidden ${!basePath? "hidden" : "lg:flex"}`}>
      <div>
        <img 
        src={logo}
        width={300}
         alt="logo" />
      </div>
      <p className='text-lg mt-2 text-rose-600'>Select user to send message</p>
    </div>

    </div>


  )
}

export default Home
