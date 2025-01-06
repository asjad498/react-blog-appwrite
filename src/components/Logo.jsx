import React from 'react'
import blogLogo from '../assets/asjad-blog.png'

function Logo({width = '70px' }) {
  return (
    <div>
      <img src={blogLogo} width={width} height="100px" alt="" />
      {/* LOGO */}
    </div>
  )
}

export default Logo
