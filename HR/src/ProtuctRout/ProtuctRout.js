import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtuctRout(props) {


  if (localStorage.getItem("UserToken") !== null) {
    return props.children
  } else {
    return <Navigate to={"/Login"} />
  }



  return (
    <div>ProtuctRout</div>
  )
}
