import React from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {

  logout = () => {
    localStorage.clear()
  }

  render(){
    return(
      <Menu>
        <Menu.Item as={NavLink} to='/home' name="Home" />
        <Menu.Item as={NavLink} to='/browse' name="Browse" />
        <Menu.Item as={NavLink} to='/edit' name="Edit Profile"/>
        <Menu.Item name="Logout" onClick={this.logout} />
      </Menu>
    )
  }

}

export default Nav
