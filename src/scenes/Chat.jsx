import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Spin } from 'antd';
import formatDate from '../components/formatDate'

const Chat = () => {
  const { id } = useParams()
  const { user, isAuthenticated, login, logout, register } = useUser();
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
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
  }, [id])

  const IncomingMessage = ({ item }) => {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] bg-[#333333] rounded-lg p-3">
          <p>{item.content}</p>
          <p className='text-[#9C9C9C] text-xs mt-1'>
            {formatDate(item.created_at, { showDay: false, showYear: false })}
          </p>
        </div>
      </div>)
  }

  const OutgoingMessage = ({ item }) => {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-[#AD8CCD] rounded-lg p-3">
          <p>{item.content}</p>
          <p className='text-[#333] text-xs mt-1'>
            {formatDate(item.created_at, { showDay: false, showYear: false })}
          </p>
        </div>
      </div>)
  }
  //
  // Автоматический скролл вниз при загрузке новых сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Срабатывает при изменении messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className='w-full h-[calc(100vh-30px)] overflow-y-auto space-y-3 px-4 pt-10'
    >
      {!loading ? (
        <>
          {messages.map((item) => (
            <div key={item.id}>
              {item.direction === 'incoming' ? (
                <IncomingMessage item={item} />
              ) : (
                <OutgoingMessage item={item} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className='flex justify-center items-center w-full h-full'>
          <Spin percent='auto' size='large' />
        </div>
      )}
    </div>
  )
}

export default Chat
