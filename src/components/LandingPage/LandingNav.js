import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const LandingNav = props => {
  return(
    <div
      className='nav-container'
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1"
      }}>
      <Menu
        style={{fontFamily: 'Pacifico, cursive'}}
        inverted
        borderless
        color={'teal'}
        size='massive'>
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
          to='/'>
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LandingNav)

LandingNav.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

LandingNav.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
