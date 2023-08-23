import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss'

const Layout = () => {
  return (
    <div className="root-layout">
      <Header />
      <main className='main-container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
