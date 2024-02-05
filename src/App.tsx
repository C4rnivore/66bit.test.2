import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './main.css'
import { Filters, FiltersProvider } from './utils/useFilters'
import Header from './components/Header/Header'
import EmployeeList from './pages/EmployeeList/EmployeeList'
import { useState } from 'react'
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile'

function App() {
  const [filters, setFilters] = useState<Filters>({
    position:[],
    gender:[],
    stack:[],
    query:''
  })

  return (
    <FiltersProvider value={{filters, setFilters}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          
          <Route 
            path='/' 
            element={ <EmployeeList/> }/>

          <Route
            path='/users/:id'
            element={<EmployeeProfile/>}/>
        </Routes>
      </BrowserRouter>
    </FiltersProvider>
  )
}

export default App
