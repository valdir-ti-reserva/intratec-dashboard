import { AccountBalanceOutlined, KeyboardArrowUp, MonetizationOnOutlined, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import './styles.scss'

interface IWidget {
  type: string
}

function Widget({ type }: IWidget) {

  //Temporary
  const amount = 100;
  const diff = 20;

  let data;

  switch(type){
    case "user":
      data={
        title: "Users",
        isMoney: false,
        link: "See all users",
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
        icon: (
          <MonetizationOnOutlined 
            className='icon'
            style={{color: 'green', backgroundColor: "rgba(0,128,0,0.2)"}} 
          />
        )
      }
    break;
    case "balance":
      data={
        title: "Balance",
        isMoney: true,
        link: "See details",
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

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{data?.isMoney && 'R$'} {amount}</span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff} %</div>
        {data?.icon}
      </div>
    </div>
  )
}

export { Widget }