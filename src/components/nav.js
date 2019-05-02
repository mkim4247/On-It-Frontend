import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { setUser } from '../redux/actions'

class Nav extends React.Component {
  state = {
    visible: false
  }
  
  logout = () => {
    this.props.setUser(null)
    localStorage.clear()
  }

  render(){
    return(
      <div>
        <Menu inverted color={'teal'}>
          <Menu.Item
            as={NavLink}
            to='/home'
            name="Home" />
          <Menu.Menu position='right'>
            {this.props.user ?
              <Menu.Item
                as={NavLink}
                name="Logout"
                to='/login'
                onClick={this.logout} />
              :
              <Menu.Item
                name="Login"
                as={NavLink}
                to='/login'/>
            }

            {this.props.user ?
              <Menu.Item>
                <span onClick={this.handleClick}>
                  {this.props.user.first_name[0] + this.props.user.last_name[0]}
                </span>
              </Menu.Item>
              : null
            }
          </Menu.Menu>
        </Menu>

        <div
          id='nav-menu'
          style={
            this.state.visible ?
          {
            display: "block",
            position: "fixed",
            right: 0,
            backgroundColor: "grey",
            padding: '100px',
            zIndex: 1
          }
          :
          { display: "none" }
        }>
        Nav Menu
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(Nav)
