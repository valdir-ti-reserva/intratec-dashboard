import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../firebase'

import { userColumns } from '../../datatablesource'

import './styles.scss'

function Datatable() {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            let list: any = []
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setData(list)
            } catch (err) {
                console.log('Error=', err);
            }
        }
        fetchData()
    }, [])
    
    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter(item => item.id !== id))
        } catch (err) {
            console.log('Error=', err);            
        }
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