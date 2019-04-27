import React from 'react'
import { connect } from 'react-redux'
import { deletingBoard, invitingToTeam } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class BoardHeader extends React.Component {
  state = {
    redirect: false,
    email: ""
  }

  deleteBoard = event => {
    let confirm = window.confirm("Are you sure?")
    if(confirm){
      this.props.deletingBoard(this.props.board, this.props.path)
      this.setState({ redirect: true })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitInviteToTeam = event => {
    event.preventDefault()
    event.target.reset()

    let invite = {team_id: this.props.team.id, email: this.state.email, receiver_id: 2 }
    this.props.invitingToTeam(invite)
  }


  render(){
    return(
      this.state.redirect ?
        <Redirect to='/home' />
        :
      <div>
        {this.props.board ?
        this.props.board.name : null }
        <br/>
        <button onClick={this.deleteBoard}> Delete Board </button>
        {this.props.team ?
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

          : null
        }
      </div>

    )
  }
}

export default connect(null, { deletingBoard, invitingToTeam })(BoardHeader)
