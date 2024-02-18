import { Routes ,Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/TokenAuth'



function App() {
  const {isAuthorised,setAuthorised}=useContext(tokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/Dashboard' element={isAuthorised?<Dashboard/>:<Home/>}/>
      <Route path='/Projects' element={isAuthorised?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
