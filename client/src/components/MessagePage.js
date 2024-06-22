import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage, FaVideo } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from "react-icons/io5";
import Loading from './Loading';
import backImage from '../assets/backImage.png'
import { IoMdSend } from "react-icons/io";
import moment from 'moment'


const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  })

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const[loading,setLoading]=useState(false);
  const[allMessage,setAllMessage]=useState([])
  const [message,setMessage] = useState({
    text:"",
    imageUrl:"",
    videoUrl:"",

  })

  const currentMessage = useRef(null)

  useEffect(()=>{
      if(currentMessage.current)
        {
          currentMessage.current.scrollIntoView({behaviour: 'smooth', block:'end'})
        }
  },[allMessage])

  const handleUploadImageVideoOpen = ()=>{
    setOpenImageVideoUpload(preve => !preve)
  }

  const handleUploadImage=async(e)=>{
    const file=e.target.files[0]
    setLoading(true);
    const uploadPhoto=await uploadFile(file) 
    setLoading(false);
    setOpenImageVideoUpload(false)

    setMessage(preve=>{
      return{
        ...preve,
        imageUrl: uploadPhoto.url
      }
    })
  }

  const handleClearUploadImage = ()=>{
    setMessage(preve=>{
      return{
        ...preve,
        imageUrl:""
      }
    })

  }

  const handleUploadVideo=async(e)=>{
    const file=e.target.files[0]
    setLoading(true)
    setOpenImageVideoUpload(false)

    const uploadPhoto=await uploadFile(file) 
    setLoading(false)
    setMessage(preve =>{
      return{
        ...preve,
        videoUrl: uploadPhoto.url
      }
    })
  }

  const handleClearUploadVideo = ()=>{
    setMessage(preve=>{
      return{
        ...preve,
        videoUrl:""
      }
    })

  }

  useEffect(()=>{
    if(socketConnection){
      socketConnection.emit('message-page',params.userId) 

      socketConnection.emit('seen',params.userId)

      socketConnection.on('message-user',(data)=>{
        setDataUser(data)
      }) 
      
      socketConnection.on('message',(data)=>{
        console.log('message data',data)
        setAllMessage(data)
      })


    }
},[socketConnection,params?.userId,user])

  const handleOnChange=(e)=>{
     const { name,value}= e.target;
     setMessage(preve=>{
      return{
        ...preve,
        text: value
      }
     })
  }

  const handleSendMessage=(e)=>{
    e.preventDefault(); 

    if(message.text || message.imageUrl || message.videoUrl)
    {
      if(socketConnection){
        socketConnection.emit('new message',{
          sender: user?._id,
          receiver : params.userId,
          text: message.text,
          imageUrl: message.imageUrl, 
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        })

        setMessage({
          text:"",
          imageUrl:"",
          videoUrl:"",

        })
      }

    }

  }



  return (
    <div style={{backgroundImage : `url(${backImage})`}} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4 '>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div >
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {dataUser.online ? <span className='text-green-600 '>online</span> : "offline"}
            </p>
          </div>
        </div>

        <div>
          <button className='cursor-pointer hover:text-primary'>
            <BsThreeDotsVertical />

          </button>
        </div>
      </header>

      {/* Show all messages */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative'>
       

        {/* all messages show here */}
        <div ref={currentMessage} className='flex flex-col gap-2 m-2'>
          {
            allMessage.map((msg,index)=>{
              return(
                <div  className={` bg-white px-1 py-1 w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? "ml-auto bg-gray-300" : ""}`}>
                  <div className='w-full'>
                    {
                      msg?.imageUrl && (
                        <img src={msg?.imageUrl} alt=""
                        className='w-full h-full object-scale-down' />
                        
                      )
                    }
            
                    {
                      msg?.videoUrl && (
                       <video 
                       src={msg.videoUrl}
                       className='w-full h-full object-scale-down' 
                       controls
                       />
                        
                      )
                    }
                  </div>
                  <p className='px-2'> {msg.text}</p>
                  <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }   
        </div>

         {/* upload image display */}
         {
          message.imageUrl && (
            <div className='w-full sticky bottom-0 h-full bg-rose-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
             <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600 ' onClick={handleClearUploadImage}>
                <IoClose size={30}/>
              </div>
            
              <div className="bg-white p-3">
                <img src={message.imageUrl}
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                alt="uploadImage" />
              </div>
          </div>
          )
        }

         {/* upload video display */}
         {
          message.videoUrl && (
            <div className='w-full sticky bottom-0 h-full bg-rose-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
             <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600 ' onClick={handleClearUploadVideo}>
                <IoClose size={30}/>
              </div>
            
              <div className="bg-white p-3">
                <video src={message.videoUrl}
                width={300}
                height={300}
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                controls
                autoPlay
                muted     
                />
              </div>
          </div>
          )
        }

        {
          loading && (
            <div className='w-full sticky bottom-0 h-full flex justify-center items-center'>
              <Loading/>
            </div>
          )
        }

       
      </section>

      {/* send message */}
      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative '>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20} />
          </button>

          {/* video and image */}
          {openImageVideoUpload && (
            <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
              <form >

                <label htmlFor='uploadImage' className='flex items-center p-2 gap-3 hover:bg-rose-200 px-3 cursor-pointer'>
                  <div className='text-blue-500'>
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor='uploadVideo' className='flex items-center p-2 gap-3 hover:bg-rose-200 px-3 cursor-pointer'>
                  <div className='text-violet-500'>
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input 
                type="file"
                id='uploadImage'
                onChange={handleUploadImage}
                className='hidden'
                 />

                <input 
                type="file"
                id='uploadVideo'
                onChange={handleUploadVideo}
               className='hidden'
                />

              </form>
            </div>
          )}


        </div>

        {/* input Box */}
        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
     
          <input 
          type="text"
          placeholder='Type here message...'
          className='py-1 px-4 outline-none w-full h-full '
          value={message.text}
          onChange={handleOnChange}
           />

          <button className='text-rose-700 hover:text-rose-900'>
            <IoMdSend size={28}/>
          </button>     
        </form>
       
      </section>
    </div>
  );
};

export default MessagePage;
