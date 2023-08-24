import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.scss'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound'
import { useContextGlobal } from './Context/global.context'

function App() {
  const {state} = useContextGlobal()
  const user = state.user.username
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
