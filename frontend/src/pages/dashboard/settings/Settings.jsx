import React from 'react'
import './settings.css'
import UpdateProfile from './UpdateProfile'
import EmailNotification from './EmailNotification'
import Reminder from './Reminder'


export default function Settings({classes}) {
  return (
    <div className='settings-page'>
      <div className="container py-5">
        <UpdateProfile/>
        <EmailNotification/>

        {/* we will add the feature later */}
        {/* <Reminder classes={classes}/> */}
      </div>
    </div>
  )
}
