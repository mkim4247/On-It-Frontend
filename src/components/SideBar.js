import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'

class Sidebar extends React.Component {
  render(){
    return(
      <div id='sidebar'>
        <Segment padded tertiary>
          <Header size={'small'}>
            Personal
          </Header>
          <ul>
          {this.props.user ?
            this.props.user.user_boards.map( user_board => (
              <li key={user_board.name + user_board.id}>
              <NavLink to='/home'>
                {user_board.name}
              </NavLink>
              </li>
            ))
            : null
          }
          </ul>
          <Header size={'small'}>
          Teams
          </Header>
          <ul>

          {this.props.user ?
            this.props.user.teams.map( team => (
              <li key={team.name + team.id}>
              <NavLink to='/home'>
                {team.name}
              </NavLink>
              </li>
            ))
          : null
          }
          </ul>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Sidebar)
