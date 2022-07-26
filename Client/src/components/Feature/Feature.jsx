import React from 'react'
import "./Feature.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const Feature = () => {
  return (
    <div className='feature'>
      <div className="top">
       <h className="tit">Total Revenue</h>
       <MoreVertIcon fontSize="small"/>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="desc">
            Previous transactions processing.Last payments not included
        </p>
        <div className="summary">
            <div className='item'>
                <div className="itemTitle">
                    Target
                </div>
                <div className="itemResult">
                    <ArrowUpwardIcon fontSize="small"/>
                    <div className="resultAmount">
                        12.4k
                    </div>
                </div>

            </div>
            <div className='item'>
                <div className="itemTitle">
                    Last week
                </div>
                <div className="itemResult">
                    <ArrowUpwardIcon fontSize="small"/>
                    <div className="resultAmount">
                        12.4k
                    </div>
                </div>

            </div>
            <div className='item'>
                <div className="itemTitle">
                    Last month
                </div>
                <div className="itemResult">
                    <ArrowUpwardIcon fontSize="small"/>
                    <div className="resultAmount">
                        12.4k
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Feature
