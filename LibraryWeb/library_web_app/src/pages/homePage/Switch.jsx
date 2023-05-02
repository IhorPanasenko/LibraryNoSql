import React from 'react';
import './Switch.css';
import axios from 'axios';

const URL_UPDATEUSER = "https://localhost:7054/api/User/Update"

const Switch = ({ isOn, onColor, id }) => {

  async function setAdmin(id) {
    let role1 = isOn ? "Admin" : "User";
    console.log("user id: " + id + "\n user new role: " + role1)
    let body = {
      Id: id,
      Role: role1
    }
    await axios({
      method: 'put',
      url: URL_UPDATEUSER,
      data: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then((response) => {
      console.log(response.data)
    })
  }

    return (
      <>
        <input
          checked={isOn}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          style={{ background: isOn && onColor }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
          onClick={() => {
            setAdmin()
          }}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  };

  export default Switch;