import React from 'react'
import { connect } from 'react-redux'
import { acceptingTeamInvite, deletingTeamInvite } from '../redux/actions'
import { Menu, Modal } from 'semantic-ui-react'

class Invites extends React.Component {
  render(){
    return(
      <div id='invite-container'>
        <Menu vertical secondary fluid size='massive'>
          <Menu.Item header>
            Invites
          </Menu.Item>
      {this.props.user ?
        this.props.user.invitations.map(invite => (
          <div key={invite.id}>
            {invite.team.name}
            <button onClick={ () => this.props.acceptingTeamInvite(invite) }>
              Accept Invite
            </button>

            <button onClick={ () => this.props.deletingTeamInvite(invite) }>
              Decline Invite
            </button>

          </div>
        ))
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
export default connect(mapStateToProps, { acceptingTeamInvite, deletingTeamInvite })(Invites)
