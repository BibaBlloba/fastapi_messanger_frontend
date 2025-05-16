import { BrowserRouter, Route, Routes } from "react-router-dom"
import General from "./scenes/General"
import Auth from "./scenes/Auth"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
