import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <>
        <NavLink to='/dashboard/'>Home</NavLink>
        <br />
        <NavLink to='/dashboard/add-note/Add'>Add Note</NavLink>
        <br />
        <NavLink to="/dashboard/view-all?type=delete">Delete Note</NavLink>
        <br />
        <NavLink to='/dashboard/view-all?type=view'>View All</NavLink>
        <br />
        <NavLink to='/dashboard/view-all?type=search'>Search Note</NavLink>
        <br />
        <NavLink to='/dashboard/view-all?type=update'>Update Note</NavLink>
    </>
  )
}

export default SideBar