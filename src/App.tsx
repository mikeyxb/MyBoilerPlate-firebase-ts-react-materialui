import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './components/auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    // this is a fragment
    <>
        <Auth />
    </>
  )
}

export default App
