import React from 'react'
import logo from '../assets/LogoNew.png'

const AuthLayouts = ({children}) => {
  return (
    <>
        <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
          
          <img src={logo} alt="logo" width={200} />
        </header>

        {children}
    </>
  )
}

export default AuthLayouts
