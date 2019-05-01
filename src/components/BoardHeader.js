import React from 'react'
import { connect } from 'react-redux'
import { deletingBoard, invitingToTeam, leavingTeam } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

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

  leaveTeam = event => {
    this.props.leavingTeam(this.props.team)
    this.setState({ redirect: true })
  }

  submitInviteToTeam = event => {
    event.preventDefault()
    event.target.reset()

    let invite = {email: this.state.email}
    this.props.invitingToTeam(invite, this.props.team)
  }


  render(){
    return(
      this.state.redirect ?
        <Redirect to='/home' />
        :
      <div id='board-header'>
        {this.props.board ?
          <Header size='medium'>
            {this.props.board.name}
          </Header>
         : null }
        <br/>
        <Button onClick={this.deleteBoard} size='tiny'>
          Delete Board
        </Button>
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
        <Button onClick={this.leaveTeam} size='tiny'>
          Leave team
        </Button>
      </div>

    )
  }
}

export default connect(null, { deletingBoard, invitingToTeam, leavingTeam })(BoardHeader)
