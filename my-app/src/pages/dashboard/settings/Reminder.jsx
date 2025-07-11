import React, { useState } from "react";
import { useSelector } from "react-redux";
import { safeMap } from "../../../utils/safeArray";

export default function Reminder({classes}) {
  return (
    <div className='reminder card rounded-4 p-3'>
      <h4>Reminder</h4>
      <p className='text-black-50'>These settings will remind you to mark the attendance session.</p>

      <div className="classes mt-4">
        <h6>Your classes</h6>
        {safeMap(classes, (c) => {
            return <div>
                <div className="filed">
                    <label htmlFor="">Time</label>
                </div>
            </div>
        })}
      </div>
    </div>
  )
}
