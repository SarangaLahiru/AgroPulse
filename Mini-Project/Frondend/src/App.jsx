import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import Header from './components/Header/header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    
    <Header />
      
    </>
  )
}

export default App
