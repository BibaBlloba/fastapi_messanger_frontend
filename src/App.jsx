import { BrowserRouter, Route, Routes } from "react-router-dom"
import General from "./scenes/General"
import Auth from "./scenes/Auth"
import { UserProvider } from "./context/UserContext"

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
