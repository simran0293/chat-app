import React from 'react'
import { PiUserCircleLight} from "react-icons/pi";
import { useSelector } from 'react-redux';


const Avatar = ({userId,name,imageUrl,width,height}) => {

  const onlineUser = useSelector(state=> state?.user?.onlineUser)

  let avatarName = ""

  if(name)
    {
      const splitName= name?.split(" ")
      if(splitName.length > 1)
        {
          avatarName = splitName[0][0]+ splitName[1][0];
        }
        else{
          avatarName = splitName[0][0]
        }
    }

    const bgColor=[
      'bg-slate-200',
      'bg-pink-300',
      'bg-red-200',
      'bg-rose-400',
      'bg-teal-200',
      'bg-cyan-200',
      'bg-gray-200',
      'bg-pink-200',
      'bg-rose-300',
    ]

    const randomNumber = Math.floor(Math.random()*9);

    const isOnline = onlineUser.includes(userId)

  return (
    <div className={` rounded-full font-bold relative`} style={{width:width+"px" , height: height+"px"}}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} width={width} height={height} className='overflow-hidden rounded-full' />
      ) : name ? (
        <div style={{width:width+"px" , height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]} `}>
          {avatarName}
        </div>
        
      ) : (
        <PiUserCircleLight size={width} />
      )}

      {
        isOnline && <div className='bg-green-600 p-1 absolute bottom-1 z-10 rounded-full -right-1'></div>
      }

      
    </div>
  )
}

export default Avatar
