import React, { useEffect, useState } from 'react'
// import { PiUserCircleLight} from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast'
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';


const CheckPasswordPage = () => {

  const[data,setData]=useState({
    password : "",
  })

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(()=>{
      if(!location?.state?.name){
        navigate('/email');
      }
  },[])

   console.log("location",location);
  // const userData = location.state;//debugging

  // console.log("Received data:", JSON.stringify(userData)); // Debugging line


  const handleOnChange=(e)=>{
      const{name,value}=e.target;

      setData((preve)=>{
        return{
          ...preve,
          [name]: value,
        }
      })
  }

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    e.stopPropagation();

    const URL=`${process.env.REACT_APP_BACKEND_URL}/api/password`

    try{
      const response = await axios({
        method :'post',
        url : URL,
        data : {
          userId : location?.state?._id,
          password : data.password
        },
        withCredentials : true
      })
      // console.log("Server response:", response.data); // Debugging line
      toast.success(response.data.message);

      if(response.data.success)
        {
          dispatch(setToken(response?.data?.token))
          localStorage.setItem('token',response?.data?.token)
          setData(
            {
              password : "",
            }
          );

          navigate('/')
        }
        else {
          toast.error(response.data.message ||  "Login failed. Please check your credentials.");
       
        }

    }catch(error){
      console.error("Error:", error.response);
      const errorMessage = error.response?.data?.message || "Failed to connect to the server. Please try again later.";
      toast.error(errorMessage);

      // console.error("Error:", error); // Debugging line
    }

  }



  return (
    <div className='mt-5'>
    <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
      <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col' >
      {/* <PiUserCircleLight
        size={80}
      /> */}
      <Avatar
        width={80} name={location?.state?.name} imageUrl={location?.state?.profile_pic} height={80}
      />
      <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>

      </div>


      <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
        

        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            className='px-2 py-1 focus: outline-primary bg-bgPrimary '
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>

        <button className='bg-buttonColor text-lg px-4 py-1 hover:bg-primary tracking-wider text-white rounded mt-2 font-bold leading-relaxed'>
          Login
        </button>
      </form>

      <p className='my-3 text-center'> <Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot Password?</Link> </p>
    </div>
  </div>
  )
}

export default CheckPasswordPage


















