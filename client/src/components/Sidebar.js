import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux'
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage, FaVideo } from "react-icons/fa6";
import { logout } from '../redux/userSlice';



const Sidebar = () => {

    //to know current user name
    const user = useSelector(state => state?.user)
    const[editUserDetails,setEditUserDetails]=useState(false);
    const[allUser, setAllUser]=useState([])
    const[openSearchUser,setOpenSearchUser]=useState(false);

    const socketConnection = useSelector(state => state?.user?.socketConnection);

    const dispatch=useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('sidebar',user._id)

            socketConnection.on('conversation',(data)=>{
                console.log("conversation",data)

                const conversationUserData = data.map((ConversationUser,index)=>{
                    if(ConversationUser?.sender?._id === ConversationUser?.receiver?._id){
                        return{
                            ...ConversationUser,
                            userDetails: ConversationUser?.sender

                        }
                    }
                    else if(ConversationUser?.receiver?._id !== user?._id)
                        {
                            return{
                                ...ConversationUser,
                                userDetails: ConversationUser?.receiver
                            }
                        }
                    else{
                        return{
                            ...ConversationUser,
                            userDetails: ConversationUser?.sender
                        }
                       

                    }
                    
                })
                setAllUser(conversationUserData)
            })
        }


    },[socketConnection,user,])

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/email")
        localStorage.clear();
    }

  return (

    <div className='w-full h-full grid grid-cols-[48px,1fr]'>
        <div className='bg-rose-50 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-rose-800 flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-bgPrimary rounded ${isActive && "bg-bgPrimary"}`} title='chat'>
                    <IoChatbubbleEllipses
                    size={20}
                    />
                </NavLink>
                <div onClick={()=>{setOpenSearchUser(true)}} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-bgPrimary rounded' title='Add friend'>
                    <FaUserPlus size={20}/>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <button className='' title={user?.name} onClick={()=>{setEditUserDetails(true)}}>
                    <Avatar
                        width={40}
                        height={40}
                        name={user?.name}
                        imageUrl={user?.profile_pic}
                        userId={user?._id}
                    />
                </button>

                <button className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-bgPrimary rounded ' onClick={handleLogout} title='logout' >
                    <span className='-ml-2'>
                        <BiLogOut size={20}/>
                    </span>     
                </button>  
            </div>          
        </div>

         <div className=' w-full bg-white bg-rose-200'>
            <div className='h-16 flex items-center'>
                <h2 className=' text-xl font-bold p-4 text-rose-800 '>Message</h2>
            </div>
           
            <div className='bg-rose-300 p-[0.5px]'></div> 

            <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                {
                    allUser.length === 0 && (
                        <div className='mt-12'>
                            <div className='flex items-center justify-center my-4 text-rose-500'>
                                <FiArrowUpLeft
                                    size={50}
                                />
                            </div>
                            <p className='text-lg text-center text-rose-400'>Explore users to start a conversation with.</p>
                        </div>
                    )
                }

                {
                    allUser.map((conv,index)=>{
                        return(
                            <NavLink to={"/"+conv?.userDetails?._id} key= {conv?._id} className='flex items-center gap-2 py-3 px-2 border hover:border-primary rounded hover:bg-rose-100 cursor-pointer'>
                                <div >
                                    <Avatar
                                    imageUrl={conv.userDetails.profile_pic}
                                    name={conv.userDetails.name}
                                    width={35}
                                    height={35}
                                    />
                                </div>
                                <div>
                                    <h3 className='text-ellipsis line clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                    <div className='text-slate-500 text-xs flex items-center gap-1'>
                                        <div >
                                            {
                                                conv?.lastMsg?.imageUrl && (
                                                    <div className='flex items-center gap-1'>
                                                        <span><FaImage/></span>
                                                        {!conv?.lastMsg?.text && <span>Image</span>} 
                                                    </div>  

                                                )                  
                                            }
                                            {
                                                conv?.lastMsg?.videoUrl && (
                                                    <div className='flex items-center gap-1'>
                                                        <span><FaVideo/></span>
                                                        {!conv?.lastMsg?.text && <span>video</span>} 
                                                    </div>  
                                                )                  
                                            }
                                        </div>
                                        <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                    </div>
                                </div>
                                {
                                    Boolean(conv?.unseenMsg) && <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>

                                }

                            </NavLink>
                        )
                    })
                }

            </div>
        </div> 



        {/* Edit user details */}
        {
            editUserDetails && (
                <EditUserDetails onClose={()=>{setEditUserDetails(false)}} user={user}/>
            )
        }

        {/* Search Users */}
        {
            openSearchUser && (
                <SearchUser onClose={()=>setOpenSearchUser(false)}/>
            )
        }
      
    </div>
  )
}

export default Sidebar
