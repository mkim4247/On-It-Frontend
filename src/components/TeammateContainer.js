import React from 'react'
import { connect } from 'react-redux'
import { invitingToTeam } from '../redux/actions'
import { Form } from 'semantic-ui-react'

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
          return <div key={user.username}>{`${user.first_name} ${user.last_name}`}</div>
        })}
        <Form onSubmit={this.submitInviteToTeam}>
          <label htmlFor='email'>
            Invite to team:
          </label>
            <Form.Input type='text' name='email' placeholder='Enter email' required onChange={this.handleChange}/>
            <Form.Input type='submit'/>
        </Form>
      </div>
    )
  }

}

export default connect(null, { invitingToTeam })(TeammateContainer)
