import React from 'react'
import "./Widgets.scss"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Widgets = ({type}) => {
   let data;
   switch (type) {
    case "user":
        data={
            tit:"Users",
            isMoney:false,
            link:"See all users",
            icon:(
                <PeopleAltIcon className='icon' style={{color:"green"}}/>
            )
        }
        break;
        case "post":
            data={
                tit:"Posts",
                isMoney:false,
                link:"See all posts",
                icon:(
                    <PostAddIcon className='icon' style={{color:"crimson"}}/>
                )
            }
            break;

            case "earnings":
                data={
                    tit:"Earnings",
                    isMoney:true,
                    link:"View earning",
                    icon:(
                        <AccountBalanceWalletIcon className='icon' style={{color:"orange"}}/>
                    )
                }
                break;
                case "balance":
                    data={
                        tit:"Balance",
                        isMoney:true,
                        link:"View balance",
                        icon:(
                            <AccountBalanceIcon className='icon' style={{color:"blue"}}/>
                        )
                    }
                    break;
   
    default:
        break;
   }
const amount =100;
const diff=20;
  return (
    <div className='widget'>
      <div className="left">
        <span className='tit'> {data.tit}</span>
        <span className="counter">{data.isMoney && "₹"} {amount }</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
       <div className="percentage positive">
        <ArrowUpwardIcon/>
        {diff}
       </div>
       {data.icon}
      </div>
    </div>
  )
}

export default Widgets
