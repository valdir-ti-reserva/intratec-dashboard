import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './styles.scss'

function NotFound() {

    const navigate = useNavigate()

    const handleReturn = () => {
        navigate('/')
    }

    return (
        <div className="notFound">
            <div className="title">
                404 - Page Not Found
            </div>
            <div className="link">
                <Button className='button' onClick={handleReturn}>Go to dashboard</Button>
            </div>
        </div>
    )
}

export { NotFound }