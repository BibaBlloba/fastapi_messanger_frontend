import React from 'react'
import ChatList from './ChatList'
import { Outlet } from 'react-router-dom'

const General = () => {
  return (
    <div className='flex flex-row justify-start'>
      <ChatList />
      <Outlet />
    </div>
  )
}

export default General
