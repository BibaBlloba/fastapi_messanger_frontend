import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Spin } from 'antd';

const Chat = () => {
  const { id } = useParams()
  const { user, isAuthenticated, login, logout, register } = useUser();
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages/${id}`, { withCredentials: true })
        console.log(response.data)
        setMessages(response.data)
        setLoading(false)
      } catch {
        //
      }
    }

    fetchData()
  }, [])

  const IncomingMessage = ({ item }) => {
    return (
      <div>
        {item.content}
      </div>
    )
  }

  const OutgoingMessage = ({ item }) => {
    return (
      <div>
        {item.content}
      </div>
    )
  }


  return (
    <div className='w-full'>
      {!loading ? (
        messages.map((item, index) => (
          <div key={item.id}>
            {item.direction === 'incoming' ? (
              <IncomingMessage item={item} />
            ) : (
              <OutgoingMessage item={item} />
            )}
          </div>
        ))
      ) : (
        <div className='flex justify-center items-center w-full h-full'>
          <Spin percent='auto' size='large' />
        </div>
      )}
    </div>
  )
}

export default Chat
