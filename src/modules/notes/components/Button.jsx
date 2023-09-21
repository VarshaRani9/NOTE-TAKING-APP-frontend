import React from 'react'
import './View.css'
const Button = ({val,fn,disable=false}) => {
  return (
    <button className="blue" onClick={fn} disabled={disable} >{val}</button>
  )
}

export default Button