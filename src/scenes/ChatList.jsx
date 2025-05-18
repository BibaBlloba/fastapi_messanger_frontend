import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Button, Spin } from 'antd';
import Avatar from 'antd/es/avatar/Avatar';
import { UserOutlined } from '@ant-design/icons';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [allUsersList, setAllUsersList] = useState(null)
  const [allUsersListLoading, setAllUsersListLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, register } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages/users`, { withCredentials: true })
        console.log(response.data)
        setAllUsersList(response.data)
        setAllUsersListLoading(false)
      } catch {
        //
      }
    }

    fetchData()
  }, [])


  const User = ({ item, isEven }) => {

    const handleClickRedirect = (e) => {
      if (window.getSelection().toString()) return;
      navigate(`/home/${item.user.id}`);
    };

    return (
      <div
        className={`pl-2 min-h-15 flex gap-2 justify-start items-center ${isEven ? 'bg-[#333333]' : 'bg-[#2a2a2a]'}`}
        onClick={handleClickRedirect}
      >
        <Avatar size={48} icon={<UserOutlined />} />
        <div className='flex flex-col'>
          <p>{item.user.username}</p>
          <p className={`max-w-50 truncate ${item.direction === 'incoming' ? 'text-[#AD8CCD]' : 'text-[#9C9C9C] '}`}>{item.last_message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen min-w-70 bg-[#212121] flex flex-col justify-between items-start'>
      <div className='flex flex-col justify-center items-start w-full'>
        {!allUsersListLoading ? (
          allUsersList.map((item, index) => (
            <div key={item.user.id} className='w-full'>
              <User item={item} isEven={index % 2 === 0} />
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <Spin percent='auto' size='large' />
          </div>
        )}
      </div>
      <div className='flex justify-between items-center p-5'>
        <IoLogOutOutline size={30} color='#F53B31' onClick={() => { logout() }} />
      </div>
    </div>
  )
}

export default ChatList
