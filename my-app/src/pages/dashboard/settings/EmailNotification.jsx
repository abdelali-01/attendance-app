import React, { useState } from "react";

export default function EmailNotification() {
  const [isChecked, setIsCheked] = useState(true);

  return (
    <div className="email-varification card rounded-4 p-3 my-4">
      <h4>Notifications</h4>
      <h5 className="mt-4">E-mail</h5>
      <p className="text-black-50">
        These settings apply to the notifications you receive via email.
      </p>

      <div className="checks mt-4 mb-3">
        <div className="check d-flex align-items-center justify-content-between">
          <h6>Allow email notifications</h6>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              checked={false}
              // onChange={()=> setIsCheked(!isChecked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
