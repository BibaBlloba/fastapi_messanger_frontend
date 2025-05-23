import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Spin } from 'antd';
import formatDate from '../components/formatDate'
import { useWebsocket } from '../hooks/useWebsocket';
import InputField from '../components/InputField';
import ChatHeader from '../components/ChatHeader';

const Chat = () => {
  const { id } = useParams()
  const { user, isAuthenticated, login, logout, register, token } = useUser();
  const [recipientUser, setRecipientUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const WS_URL = import.meta.env.VITE_WS_URL;
  const { webSocketMessages, sendMessage, isConnected } = useWebsocket(`${WS_URL}${token}`);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fetchRecipientUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`, { withCredentials: true })
        setRecipientUser(response.data)
      } catch (error) {
        //
      }
    }
    if (id) {
      fetchRecipientUser()
    }
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages/${id}`, { withCredentials: true })
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

  useEffect(() => {
    if (webSocketMessages && webSocketMessages.length > 0) {
      const lastWebSocketMessage = webSocketMessages[webSocketMessages.length - 1];

      const parsedMessage = typeof lastWebSocketMessage === 'string'
        ? JSON.parse(lastWebSocketMessage)
        : lastWebSocketMessage;

      const formattedMessage = {
        id: parsedMessage.id,
        content: parsedMessage.content,
        created_at: parsedMessage.created_at,
        direction: parsedMessage.sender_id === user.id ? 'outgoing' : 'incoming',
        recipient_id: parsedMessage.recipient_id,
        sender_id: parsedMessage.sender_id
      };

      setMessages(prev => {
        const currentMessages = prev || [];
        const messageExists = currentMessages.some(msg => msg.id === formattedMessage.id);

        return messageExists
          ? currentMessages
          : [...currentMessages, formattedMessage];
      });
    }
  }, [webSocketMessages, user.id]);

  // Автоматический скролл вниз при загрузке новых сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages, webSocketMessages]); // Срабатывает при изменении messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (values) => {

    if (values.trim()) {
      sendMessage({
        type: "private",
        to: id,
        content: values,
      });
      setInputMessage('');
    }

    const formattedMessage = {
      id: Date.now(),
      content: values,
      created_at: new Date().toISOString(),
      direction: 'outgoing',
    };

    setMessages(prev => {
      const currentMessages = prev || [];
      const messageExists = currentMessages.some(msg => msg.id === formattedMessage.id);

      return messageExists
        ? currentMessages
        : [...currentMessages, formattedMessage];
    });
  };

  return (
    <div
      ref={containerRef}
      className='flex flex-col justify-between w-full h-[100vh] overflow-y-auto space-y-3'
    >
      <div className='flex items-center min-h-15 bg-[#212121] pl-2 m-0'>
        <ChatHeader user={recipientUser} />
      </div>
      <div
        className='flex flex-col overflow-y-auto space-y-3 px-4 pt-10'
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
      <div className="sticky bottom-0 p-4 bg-[#212121]">
        <InputField onClick={handleSendMessage} />
      </div>
    </div>
  )
}

export default Chat
