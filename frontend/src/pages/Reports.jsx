import React from 'react'
import Publish from '../components/Publish'

export default function Reports({classes}) {
  return (
    <div className='reports-page'>
        <div className="container py-5">
            <Publish classes={classes}/>
        </div>
    </div>
  )
}
