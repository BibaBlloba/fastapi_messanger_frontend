import { Avatar, Button } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { TbDotsVertical } from "react-icons/tb";

const ChatHeader = ({ user }) => {

  if (user) {
    return (
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex items-center gap-5'>
          <Avatar size={48} icon={<UserOutlined />} />
          <p className='text-xl'>{user.username}</p>
        </div>
        <TbDotsVertical className='mr-4' size={24} />
      </div >
    )
  } else {
    //
  }

}

export default ChatHeader
