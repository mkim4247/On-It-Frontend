import React from 'react'
import { connect } from 'react-redux'
import { invitingToTeam } from '../redux/actions'

class TeammateContainer extends React.Component {
  state = {
    email: ""
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitInviteToTeam = event => {
    event.preventDefault()
    event.target.reset()

    let invite = {email: this.state.email}
    this.props.invitingToTeam(invite, this.props.team)
  }

  render(){
    return(
      <div>
        Users:
        {this.props.team.users.map( user => {
          return <div key={user.username}>{ user.username }</div>
        })}
        <br/>
        Invite to team
        <form onSubmit={this.submitInviteToTeam}>
            <input type='text' name='email' placeholder='Enter email' required onChange={this.handleChange}/>
            <input type='submit'/>
        </form>
      </div>
    )
  }

}

export default connect(null, { invitingToTeam })(TeammateContainer)
