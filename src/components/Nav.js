import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { setUser } from '../redux/userActions'

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
        <Menu style={{fontFamily: 'Pacifico, cursive'}} inverted color={'teal'} size='massive' >
          {this.props.user ?
            <Menu.Item
              as={NavLink}
              to={`/user/${this.props.user.username}`}>
                {this.props.user.first_name[0] + this.props.user.last_name[0]}
            </Menu.Item>
            : null
          }
          {this.props.user ?
            <Menu.Item
              as={NavLink}
              to='/boards'
              name="Boards" />
            : null
          }
          <Menu.Item
            as={NavLink}
            to='/about'
            name='About' />
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
