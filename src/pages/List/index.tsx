import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { Datatable } from "../../components/Datatable"

import './styles.scss'

function List({ columns, title, path }: any) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <Datatable title={title} columns={columns} path={path}/>
        </div>
      </div>
    </div>
  )
}

export { List }