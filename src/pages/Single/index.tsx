import { Chart } from '../../components/Chart'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { List } from '../../components/Table'
import './styles.scss'

function Single() {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img 
                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198" 
                alt="user avatar"
                className="itemImg" 
              />
              <div className="details">
                <h1 className="itemTitle">John Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:&nbsp;</span>
                  <span className="itemValue">johndoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:&nbsp;</span>
                  <span className="itemValue">+1 1121 23 21</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:&nbsp;</span>
                  <span className="itemValue">Elton St. 234 Garden Yd. New York</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:&nbsp;</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="User Spending (Last 6 months)"/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  )
}

export { Single }