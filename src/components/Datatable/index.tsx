import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { useConfirm } from 'material-ui-confirm'

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'

import { userColumns } from '../../datatablesource'

import './styles.scss'

function Datatable() {

    const [data, setData] = useState<any[]>([])
    const confirm = useConfirm()

    useEffect(() => {
        //Listen (REALTIME)
        const unsub = onSnapshot(
            collection(db, "users"), 
            (snapshot) => {
                let list: any = []
                snapshot.docs.forEach(doc => {
                    list.push({ id: doc.id, ...doc.data() })
                })
            setData(list)
            }, (err) => {
                console.log('Error=', err)
            })
        return () => {
            unsub()
        }
    }, [])
    
    const handleDelete = async (id: string) => {

        confirm({
            title: 'Atenção', 
            description: 'Deseja realmente excluir esse item?', 
            confirmationText: 'Sim', 
            cancellationText: 'Não',
            cancellationButtonProps: {
                style: {
                  background: '#ff000091',
                  color: 'white',
                  fontWeight: 'bold'
                }
              },
              confirmationButtonProps: {
                style: {
                  background: '#008000cc',
                  color: 'white',
                  fontWeight: 'bold'
                }
              }
        }).then(async () => {
            deleteDoc(doc(db, "users", id));
            setData(data.filter(item => item.id !== id))
        }).catch(() => console.log("Operação cancelada pelo usuário."))
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