import './App.css'
import Home from './Routes/Home'
import Signin from './Routes/Signin'
import Signup from './Routes/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Protected } from './Routes/Protected'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Protected><Home /></Protected>,
    },
    {
      path: '/home',
      element: <Protected><Home /></Protected>,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    {
      path: '/signup',
      element: <Signup />,
    }
  ])

  return (
    <AuthContext className='flex'>
      <RouterProvider router={router} />
    </AuthContext>
  )
}

export default App
