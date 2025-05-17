import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import General from "./scenes/General"
import Auth from "./scenes/Auth"
import { UserProvider, useUser } from "./context/UserContext"
import Chat from "./scenes/Chat"

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthGuard />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/home' element={
              <ProtectedRoute>
                <General />
              </ProtectedRoute>
            }>
              <Route path=':id' element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

// Компонент для защиты маршрутов
function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// Компонент для перенаправления авторизованных пользователей
function AuthGuard() {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/general" replace />;
  }

  return <Navigate to="/auth" replace />;
}

export default App
