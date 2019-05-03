import React from 'react'
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'
import InviteForm from './InviteForm'
import { leavingTeam } from '../redux/actions'

class UsersList extends React.Component {

  leaveTeam = event => {
    let confirm = window.confirm("Are you sure you want to leave this team?")

    if(confirm){
      this.props.leavingTeam(this.props.team)

      this.setState({
        redirect: true
      })
    }
  }

  render(){
    return(
      <div className='right-container'>
        <Menu
          vertical
          secondary
          fluid
          size='massive'>
          <Menu.Item>
            <InviteForm team={this.props.team}/>
          </Menu.Item>
          <Menu.Item header>
            MEMBERS
          </Menu.Item>
          <Menu.Menu>
            {this.props.team ?
              this.props.team.users.map( user => (
                <Menu.Menu key={`menu-${user.id}`}>
                  <Menu.Item
                    header
                    key={`member-${user.id}`}>
                    {`${user.first_name} ${user.last_name}`}
                  </Menu.Item>
                  <Menu.Item>
                    {user.email}
                  </Menu.Item>
                </Menu.Menu>
              ))
              : null
            }
          </Menu.Menu>
          {this.props.team ?
            <Menu.Item>
              <Button
                onClick={this.leaveTeam}
                fluid
                color='red'>
                Leave Team
              </Button>
            </Menu.Item>
            : null
          }
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

export default connect(mapStateToProps, { leavingTeam })(UsersList)
