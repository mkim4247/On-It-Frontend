import React from 'react'
import { connect } from 'react-redux'

class Invites extends React.Component {
  render(){
    return(
      <div id='invite-container'>
      Invites
      {this.props.user ?
        this.props.user.invitations.map(invite => (
          <div>
            {invite.team_id}
          </div>
        ))
        : null
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Invites)
