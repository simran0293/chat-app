import React from 'react'
import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({user,onClose}) => {
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex gap-3 p-2 items-center lg:p-4 border border-transparent border-b-rose-200 hover:border-primary rounded cursor-pointer'>
      <div>
        <Avatar
        width={45}
        height={45}
        name={user?.name}
        userId={user?._id}
        imageUrl={user?.profile_pic}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserSearchCard
