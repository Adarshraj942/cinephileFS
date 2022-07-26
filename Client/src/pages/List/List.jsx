import React from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import Table from '../../components/table/Table'
// import "./List.scss`"
const List = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="HomeContainer">
        <Navbar/>
        <div className="listContainer">
            <div className="listTile">Latest users</div>
            <Table />
          </div>
      </div>
    </div>
  )
}

export default List
