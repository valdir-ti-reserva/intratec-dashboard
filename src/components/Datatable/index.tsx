import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

import { userColumns, userRows } from '../../datatablesource'

import './styles.scss'

function Datatable() {

    const [data, setData] = useState(userRows)

    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id))
    }

    const actionColumn = [
        {
            field: 'action', 
            headerName: 'Action', 
            width: 200, 
            renderCell: (params: any) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{textDecoration: 'none'}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
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
            className='datagrid'
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
        />
    </div>
  )
}
export { Datatable }