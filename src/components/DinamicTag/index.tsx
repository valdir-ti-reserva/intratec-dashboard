import {
  AccountBalance,
  AccountBalanceWallet,
  AtmOutlined,
  CurrencyExchange,
  FactorySharp,
  ListAlt,
  PersonOutline,
  PersonOutlined,
  PlaylistAddOutlined,
  ViewModuleSharp
} from "@mui/icons-material"

interface IDinamicTag {
  icon: string
  classname: string
}

export const DinamicTag = ({ icon, classname }: IDinamicTag) => {
  switch (icon) {
      case 'PlaylistAddOutlined': return <PlaylistAddOutlined className={classname} />
      case 'AtmOutlined': return <AtmOutlined className={classname} />
      case 'PersonOutlined': return <PersonOutlined className={classname} />
      case 'ListAlt': return <ListAlt className={classname} />
      case 'ViewModuleSharp': return <ViewModuleSharp className={classname} />
      case 'FactorySharp': return <FactorySharp className={classname} />
      case 'PersonOutline': return <PersonOutline className={classname} />
      case 'AccountBalance': return <AccountBalance className={classname} />
      case 'CurrencyExchange': return <CurrencyExchange className={classname} />
      case 'AccountBalanceWallet': return <AccountBalanceWallet className={classname} />
      default: return null
  }
}