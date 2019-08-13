import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class LandingNav extends React.Component {

  render(){
    return(
      <div>
        <Menu style={{fontFamily: 'Pacifico, cursive'}} inverted color={'teal'} size='massive'>
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
            to='/'
            >
            On It!
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              name="Login"
              as={NavLink}
              to='/login'/>
            <Menu.Item
              name="Sign Up"
              as={NavLink}
              to='/new'/>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LandingNav)
