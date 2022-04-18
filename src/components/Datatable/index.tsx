import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

import { userColumns, userRows } from '../../datatablesource'

import './styles.scss'

function Datatable() {

    const actionColumn = [
        {
            field: 'action', 
            headerName: 'Action', 
            width: 200, 
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{textDecoration: 'none'}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <Link to="/users/test" style={{textDecoration: 'none'}}>
                            <div className="deleteButton">Delete</div>
                        </Link>
                    </div>
                )
            }
        } 
    ]

  return (
    <div className="datatable">
        <div className="dataTableTitle">
            Add new User
            <Link to="/users/new" className="link">
                Add new
            </Link>
        </div>
        <DataGrid
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
        />
    </div>
  )
}
export { Datatable }