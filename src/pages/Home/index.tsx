import { List } from '../../components/Table'
import { Chart } from '../../components/Chart'
import { Navbar } from '../../components/Navbar'
import { Widget } from '../../components/Widget'
// import { Sidebar } from '../../components/Sidebar'
import { FeaturedChart } from '../../components/FeaturedChart'

import './styles.scss'

function Home() {
  return (
    <div className="home">
        {/* <Sidebar /> */}
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="products" />
            <Widget type="order" />
            <Widget type="earning" />
          </div>
          <div className="charts">
            <FeaturedChart />
            <Chart aspect={2/1} title="LAST 6 MONTHS (Revenue)"/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <List />
          </div>
        </div>
    </div>
  )
}

export {Home}
