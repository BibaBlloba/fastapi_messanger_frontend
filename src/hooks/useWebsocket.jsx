import { useEffect, useRef, useState } from "react"

export const useWebsocket = (url) => {
  const [webSocketMessages, setWebSocketMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url)

    ws.current.onopen = () => {
      setIsConnected(true)
      console.log('Websocket connected')
    }

    ws.current.onmessage = (event) => {
      let data;
      try {
        data = event.data;
        console.log('Parsed data:', data);

        setWebSocketMessages(prev => [...prev, data]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false)
      console.log('Websocket disconnected')
    }

    ws.current.onerror = (error) => {
      console.error('Websocket error:', error)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [url])

  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(message))
    }
  }

  return { webSocketMessages, sendMessage, isConnected }
}
