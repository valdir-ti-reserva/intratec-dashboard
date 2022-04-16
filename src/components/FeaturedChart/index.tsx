import { KeyboardArrowDown, KeyboardArrowUpOutlined, MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import './styles.scss'

function FeaturedChart() {
  return (
    <div className='featureChart'>
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVert fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredBar">
                <CircularProgressbar value={70} text="70%" strokeWidth={3}/>
            </div>
            <p className="title">Total sales made today</p>
            <p className="amount">R$420</p>
            <p className="desc">Previous transactions processing. Last payment may not be included.</p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlined fontSize='small'/>
                        <div className="resultAmount">
                            R$12.4k
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDown fontSize='small'/>
                        <div className="resultAmount">
                            R$12.4k
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlined fontSize='small'/>
                        <div className="resultAmount">
                            R$12.4k
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export { FeaturedChart }