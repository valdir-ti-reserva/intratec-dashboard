import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import './styles.scss'

function Home() {
  return (
    <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          Home Container
        </div>
    </div>
  )
}

export {Home}
