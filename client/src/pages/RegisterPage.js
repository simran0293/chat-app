import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'; 
import toast from 'react-hot-toast'

const RegisterPage = () => {

  const[data,setData]=useState({
    name : "",
    email : "",
    password : "",
    profile_pic : "",
  })

  const[uploadPhoto,setUplaodPhoto]=useState("")

  const navigate = useNavigate()

  const handleOnChange=(e)=>{
      const{name,value}=e.target;

      setData((preve)=>{
        return{
          ...preve,
          [name]: value,
        }
      })
  }

  const handleUploadPhoto=async(e)=>{
    const file=e.target.files[0]

    const uploadPhoto=await uploadFile(file) 

    setUplaodPhoto(file);

    setData((preve)=>{
      const newState={
        ...preve,
        profile_pic: uploadPhoto?.url
      }
      return newState;
    })

  }

  const handleClearUploadPhoto=(e)=>{
    setUplaodPhoto(null);
    e.preventDefault();
    e.stopPropagation();
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    e.stopPropagation();

    const URL=`${process.env.REACT_APP_BACKEND_URL}/api/register`

    try{
      const response = await axios.post(URL,data)
      console.log("response",response.data)
      // toast.success(response.data.message)

      console.log("Response from server:", response.data);
      if(response.data.status)
        {
          toast.success(response.data.message);
         
          setData(
            {
              name : "",
              email : "",
              password : "",
              profile_pic : "",
            }
          );

          navigate('/email')
        }
        else {
          toast.error(response.data.message);
          console.log("Registration failed:", response.data.message);
       
        }

    }catch(error){
      // toast.error(error?.response?.data?.message)
      //   console.log("error",error)
      toast.error("Failed to connect to the server.");
    console.error("Error during registration:", error);
    }

    console.log("Submitted data:", data);
  }

  

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>
          Welcome to Chit Chat!
        </h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary '
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Profile Pic: 

              <div className='h-14 bg-bgPrimary flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                 {
                  uploadPhoto?.name? uploadPhoto?.name : " Upload Profile Photo"
                 } 
                 </p>
                 {
                 uploadPhoto?.name && 
                 (<button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                 <IoCloseSharp/>
                 </button>)
                 } 
                 
              </div>
            </label>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary hidden'
              onChange={handleUploadPhoto}
            />
          </div>

          <button className='bg-buttonColor text-lg px-4 py-1 hover:bg-primary tracking-wider text-white rounded mt-2 font-bold leading-relaxed'>
            Register
          </button>
        </form>

        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link> </p>
      </div>
    </div>
  )
}

export default RegisterPage
