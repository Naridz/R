import { Routes,Route } from 'react-router-dom'
import Home from './Views/Home'
import Nav from './Components/Nav'
import Add from './Views/Add'
import Edit from './Views/Edit'




function App() {

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<Add />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes> 
    </>
  )
}

export default App
