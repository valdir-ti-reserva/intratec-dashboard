import { AccountBalanceOutlined, KeyboardArrowDown, KeyboardArrowUp, MonetizationOnOutlined, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

import './styles.scss'

interface IWidget {
  type: string
}

interface IData {
  title: string
  isMoney: boolean
  link: string
  route: string
  query: string
  icon: any
}

function Widget({ type }: IWidget) {

  const [amount, setAmount] = useState(0)
  const [diff, setDiff] = useState(0)

  let data: IData = {
    title: '',
    isMoney: false,
    link: '',
    route: '',
    query: '',
    icon: ''
  }

  switch(type){
    case "user":
      data={
        title: "Users",
        isMoney: false,
        link: "See all users",
        route: "users",
        query: "users",
        icon: (
          <PersonOutlineOutlined 
            className='icon' 
            style={{color: 'crimson', backgroundColor: "rgba(255,0,0,0.2)"}}
          />
        )
      }
    break;
    case "order":
      data={
        title: "Orders",
        isMoney: false,
        link: "See all orders",
        route: "orders",
        query: "orders",
        icon: (
          <ShoppingCartOutlined 
            className='icon'
            style={{color: 'goldenrod', backgroundColor: "rgba(218,165,32,0.2)"}}
          />
        )
      }
    break;
    case "earning":
      data={
        title: "Earnings",
        isMoney: true,
        link: "View net earnings",
        route: "earnings",
        query: "earnings",
        icon: (
          <MonetizationOnOutlined 
            className='icon'
            style={{color: 'green', backgroundColor: "rgba(0,128,0,0.2)"}} 
          />
        )
      }
    break;
    case "products":
      data={
        title: "Products",
        isMoney: true,
        link: "See details",
        route: "products",
        query: "products",
        icon: (
          <AccountBalanceOutlined 
            className='icon'
            style={{color: 'purple', backgroundColor: "rgba(128,0,128,0.2)"}}
          />
        )
      }
    break;
      default:
        break;
  }

  useEffect(() => {
    const fetchData = async() => {
      const today = new Date()
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2))
    
      const lastMonthQuery = query(
        collection(db, data.query),
        where("timestamp", "<=", today),
        where("timestamp", ">", lastMonth)
      )
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timestamp", "<=", lastMonth),
        where("timestamp", ">", prevMonth)
      )

      const lastMonthData = await getDocs(lastMonthQuery)
      const prevMonthData = await getDocs(prevMonthQuery)

      setAmount(lastMonthData.docs.length)
      setDiff((lastMonthData.docs.length - prevMonthData.docs.length) / (prevMonthData.docs.length) * 100)

    }

    fetchData()
  }, [data.query])

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{data?.isMoney && 'R$'} {amount}</span>
        <Link to={data?.route || "/"} style={{textDecoration: 'none', color: "#000"}}>
          <span className="link">{data?.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? 'negative' : 'positive'}`}>
          {diff < 0 ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          {diff !== Infinity && diff ? diff : 0} %</div>
          {data?.icon}
        </div>
    </div>
  )
}

export { Widget }
