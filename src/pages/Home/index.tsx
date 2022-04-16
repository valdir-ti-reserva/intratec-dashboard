import { Chart } from '../../components/Chart'
import { FeaturedChart } from '../../components/FeaturedChart'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { Widget } from '../../components/Widget'
import './styles.scss'

function Home() {
  return (
    <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <FeaturedChart />
            <Chart />
          </div>
        </div>
    </div>
  )
}

export {Home}
