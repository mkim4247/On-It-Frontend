import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { setUser } from '../redux/userActions'
import PropTypes from 'prop-types';

const Nav = props => {
  const logout = () => {
    props.setUser(null)
    localStorage.clear()
  }

  return(
    <div>
      <Menu
        style={{fontFamily: 'Pacifico, cursive'}}
        inverted
        color={'teal'}
        size='massive' >
        {props.user ?
          <Menu.Item
            as={NavLink}
            to={`/user/${props.user.username}`}>
              {props.user.first_name[0] + props.user.last_name[0]}
          </Menu.Item>
          : null
        }
        {props.user ?
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
          {props.user ?
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(Nav)

Nav.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

Nav.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
