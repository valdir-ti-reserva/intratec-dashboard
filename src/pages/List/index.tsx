import { Datatable } from "../../components/Datatable"
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"

import './styles.scss'

function List() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <Datatable />
        </div>
      </div>
    </div>
  )
}

export {List}