import './App.css'
import Home from './Routes/Home'
import Signin from './Routes/SignIn'
import Signup from './Routes/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Protected } from './Routes/Protected'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import gardenBG from './assets/gardenBG.jpg'
import ReviewsPage from './Routes/ReviewsPage'
import AddReview from './Routes/AddReview'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/reviews',
      element: <Protected><ReviewsPage /></Protected>,
    },
    {
      path: '/add',
      element: <Protected><AddReview /></Protected>,
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
    <AuthContext>
      <div className="flex w-full flex-col align-middle">
        <RouterProvider router={router} />
      </div>
    </AuthContext>
  )
}

export default App