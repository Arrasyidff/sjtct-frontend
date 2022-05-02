import React from 'react'
import './emptyData.scss'
import empty from '../../assets/images/empty.svg'

function EmptyData() {
  return (
    <div className="sjtct__empty-data section__padding">
      <img src={empty} alt="" />
      <p>Data Not Found</p>
    </div>
  )
}

export default EmptyData