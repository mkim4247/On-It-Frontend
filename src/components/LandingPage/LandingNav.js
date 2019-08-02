import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class LandingNav extends React.Component {

  render(){
    return(
      <div>
        <Menu inverted color={'teal'} size='massive' fixed='top'>
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
            style={{fontFamily: 'Pacifico, cursive'}}>
            On It!
          </Menu.Item>
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
