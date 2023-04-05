import React from 'react'

const TypingAnimation = () => {
  return (
    <div className='flex items-center space-x-2'>
        <div className='w-4 h-4 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 animate-pulse'></div>
        <div className='w-4 h-4 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 animate-pulse delay-75'></div>
        <div className='w-4 h-4 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 animate-pulse delay-150'></div>
    </div>
  )
}

export default TypingAnimation